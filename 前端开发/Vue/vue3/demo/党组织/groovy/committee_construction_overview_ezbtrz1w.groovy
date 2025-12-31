import groovy.json.JsonOutput

logger.info("Groovy版本: " + GroovySystem.version)

// 同时构建树和统计节点
def buildTreeAndCount(allLedgers, ledgerMap, orgId, nodeCounts, partyCellData) {
  def ledger = ledgerMap[orgId]
  if (!ledger) {
    logger.debug("未找到组织ID ${orgId} 对应的台账记录")
    return null
  }
  
  // 统计当前节点类型
  nodeCounts.total++
  def orgType = ledger.org_category_code
  if (orgType == 'party_committee') {
    nodeCounts.committee++
  } else if (orgType == 'party_branch') {
    nodeCounts.branch++
  } else if (orgType == 'party_cell') {
    nodeCounts.cell++
    // 收集party_cell类型节点的成员统计字段
    partyCellData.add([
      uid: ledger.uid,
      org_abbr_name: ledger.org_abbr_name,
      org_full_name: ledger.org_full_name,
      member_total_count: ledger.member_total_count,
      formal_member_count: ledger.formal_member_count,
      probationary_member_count: ledger.probationary_member_count,
      party_worker_count: ledger.party_worker_count,
      activist_count: ledger.activist_count
    ])
  }
  
  def node = [
    uid: ledger.uid,
    parent_id: ledger.parent_id,
    party_organizations_id: ledger.party_organizations_id,
		org_abbr_name: ledger.org_abbr_name,
    org_full_name: ledger.org_full_name,
    org_category_code: ledger.org_category_code,
		process_instance_id: ledger.process_instance_id,
    children: []
  ]
  
  // 查找所有子组织台账并递归构建子树
  allLedgers.each { childLedger ->
    if (childLedger.parent_id == orgId) {
      def childNode = buildTreeAndCount(allLedgers, ledgerMap, childLedger.party_organizations_id, nodeCounts, partyCellData)
      if (childNode) {
        node.children.add(childNode)
      }
    }
  }
  
  return node
}

// 构建台账树结构并同时统计节点
def buildLedgerTreeWithCounts(allLedgers, rootOrgId) {
  if (!allLedgers || !rootOrgId) {
    logger.warn("构建台账树参数为空")
    return [
      ledgerTree: null, 
      nodeCounts: [total: 0, committee: 0, branch: 0, cell: 0],
      partyCellData: []
    ]
  }
  
  // 创建ID到台账对象的映射
  def ledgerMap = allLedgers.collectEntries { [it.party_organizations_id, it] }
  
  // 初始化统计对象和党小组数据列表
  def nodeCounts = [total: 0, committee: 0, branch: 0, cell: 0]
  def partyCellData = []
  
  // 构建树并统计
  def ledgerTree = buildTreeAndCount(allLedgers, ledgerMap, rootOrgId, nodeCounts, partyCellData)
  
  return [ledgerTree: ledgerTree, nodeCounts: nodeCounts, partyCellData: partyCellData]
}

// 初始化返回结果
def committeeOverview = [
  ledgerTree: null,
  nodeCounts: [total: 0, committee: 0, branch: 0, cell: 0],
  committeeLedger: {},
  partyCellDetails: []  // 添加党小组详情数组
]

// 获取台账日期最新的审核完成的党委建设台账信息
def latestConstructionLedger = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_selectMore", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 1,
  "query_criteria": [
    [
      "column_name_list": null,
      "column_name": "org_category_code",
      "value": ["party_committee"],
      "query_type": 0
    ],
    [
      "column_name_list": null,
      "column_name": "process_status",
      "value": ["COMPLETE"],
      "query_type": 0
    ]
  ],
  "sort_criteria": [
    "ledger_date": "DESC"
  ]
]))

// 检查结果并处理
if (!latestConstructionLedger.isEmpty()) {
  def latestLedger = latestConstructionLedger[0]
  def orgId = latestLedger.party_organizations_id
  def ledgerDate = latestLedger.ledger_date

  // 存储最新的建设台账信息
  committeeOverview.committeeLedger = latestLedger
  
  logger.info("开始构建台账树，基准组织ID: " + orgId + "，台账日期: " + ledgerDate)
  
  // 查询该日期下的所有相关台账
  def allLedgers = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_selectMore", JsonOutput.toJson([
    "page_index": 1,
    "page_size": 500,
    "query_criteria": [
      [
        "column_name_list": null,
        "column_name": "ledger_date",
        "value": [ledgerDate],
        "query_type": 0
      ]
    ],
		"sort_criteria": [
			"company_level": "ESC",
			"company_create_time": "DESC",
			"sort_weight": "DESC",
			"company_create_time": "DESC" 
		]
  ]))

  logger.info("allLedgers: " + allLedgers)
  
  // 构建台账树结构并统计节点数量
  if (allLedgers && allLedgers instanceof List) {
    def result = buildLedgerTreeWithCounts(allLedgers, orgId)
    
    // 输出树结构信息
    if (result.ledgerTree) {
      logger.info("台账树构建成功，根节点组织: " + result.ledgerTree.org_full_name)  // 修改这里，移除ledger.
      logger.info("子节点数量: " + result.ledgerTree.children.size())
      logger.info("台账树节点统计 - 总数: " + result.nodeCounts.total + 
                  ", 党委: " + result.nodeCounts.committee + 
                  ", 党支部: " + result.nodeCounts.branch + 
                  ", 党小组: " + result.nodeCounts.cell)
      
      // 设置结果值
      committeeOverview.ledgerTree = result.ledgerTree
      committeeOverview.nodeCounts = result.nodeCounts
      committeeOverview.partyCellDetails = result.partyCellData  // 保存党小组详情数据
      logger.info("已收集党小组数据共 " + result.partyCellData.size() + " 条")
    } else {
      logger.info("无法构建台账树，未找到根节点台账")
    }
  } else {
    logger.info("未找到相关台账记录")
  }
} else {
  logger.info("未找到已审核完成的建设台账信息")
}

return committeeOverview