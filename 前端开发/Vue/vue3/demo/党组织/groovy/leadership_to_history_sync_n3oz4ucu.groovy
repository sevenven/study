import groovy.json.JsonOutput

// 全局变量定义
def partyOrganizationsId = ${__input__.partyOrganizationsId}
def orgCategoryCode = ${__input__.orgCategoryCode}

logger.info("Groovy版本: " + GroovySystem.version + ", 党组织ID: " + partyOrganizationsId + ", orgCategoryCode: " + orgCategoryCode)

// 根据党组织ID查找当前届信息
def currentTermInfo = callService("app_mgt503l5m8", "t_election_records_zn2e5kuu_selectMore", JsonOutput.toJson([
  page_index: 1,
  page_size: 1,
  query_criteria: [
    [
      column_name: "party_organizations_id",
      value: [partyOrganizationsId],
      query_type: 0
    ],
    [
      column_name: "is_current",
      value: ["1"],
      query_type: 0
    ]
  ],
  sort_criteria: [
    "update_time": "DESC"
  ]
]))
logger.info("当前届信息: " + currentTermInfo)

// 获取当前组织的所有届期信息 将除当前届外的所有届期信息的is_current字段置为'0'
def allTermsInfo = callService("app_mgt503l5m8", "t_election_records_zn2e5kuu_selectMore", JsonOutput.toJson([
  page_index: 1,
  page_size: 100,  // 获取所有届期信息
  query_criteria: [
    [
      column_name: "party_organizations_id",
      value: [partyOrganizationsId],
      query_type: 0
    ]
  ]
]))
logger.info("当前组织所有届期信息: " + allTermsInfo)

// 将除当前届外的所有届期信息的is_current字段置为'0'
if (allTermsInfo && allTermsInfo.size() > 0) {
  allTermsInfo.each { term ->
    // 排除当前届(如果存在)
    if (currentTermInfo && currentTermInfo.size() > 0 && term.uid == currentTermInfo[0].uid) {
    } else {
      // 将非当前届的is_current字段设置为'0'
      def updateResult = callService("app_mgt503l5m8", "t_election_records_zn2e5kuu_update", [
        uid: term.uid,
        is_current: "0"
      ])
    }
  }
}

// 提取公共的更新函数
def updateMemberPosition(historyUid, orgCategoryCode, positionCodeValue) {
  // 权重映射：职位代码 -> 权重
  def positionWeightMap = [
    'secretary': 1, 'deputy_secretary': 2, 'discipline_secretary': 3,
    'organization_commissar': 4, 'publicity_commissar': 5, 'united_front_commissar': 6,
    'youth_commissar': 7, 'mass_work_commissar': 8, 'study_commissar': 9
  ]

  // 字段映射
  def positionFieldNameMap = [
    'party_committee': "committee_party_position_code",
    'party_branch': "branch_party_position_code", 
    'party_cell': "cell_party_position_code"
  ]
  
  def weightFieldNameMap = [
    'party_committee': "committee_position_weight",
    'party_branch': "branch_position_weight", 
    'party_cell': "cell_position_weight"
  ]

  // 获取字段名
  def positionFieldName = positionFieldNameMap[orgCategoryCode]
  def weightFieldName = weightFieldNameMap[orgCategoryCode]

  // 准备更新参数
  def updateParams = [uid: historyUid]
  
  updateParams[positionFieldName] = positionCodeValue
  
  // 计算最高权重
  Integer highestWeight = 100;
  positionCodeValue.each { pos ->
    String trimmedPos = pos?.toString()?.trim()
    if (trimmedPos && positionWeightMap.containsKey(trimmedPos)) {
      int currentWeight = positionWeightMap[trimmedPos]
      if (currentWeight < highestWeight) {
        highestWeight = currentWeight
      }
    }
  }
  updateParams[weightFieldName] = highestWeight
  // 调用更新服务
  callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", updateParams)
}

 // 根据组织类型确定查询的 key
 def queryKey = 'cell_id'
 if (orgCategoryCode == 'party_cell') {
   queryKey = 'cell_id'
 } else if (orgCategoryCode == 'party_branch') {
   queryKey = 'branch_id'
 } else if (orgCategoryCode == 'party_committee') {
   queryKey = 'committee_id'
 }

// 获取党组织当前党员信息
def memberTransferHistory = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf", JsonOutput.toJson([
	page_index: 1,
	page_size: 100,
	query_criteria: [
		[
			column_name: queryKey,
			value: [partyOrganizationsId],
			query_type: 0
		],
		[
			column_name: 'is_current',
			value: ['1', '3'],
			query_type: 3
		]
	]]))
 

if (currentTermInfo && currentTermInfo.size() > 0) {
  def currentTermId = currentTermInfo[0].uid
  // 查询领导班子列表
  def leadershipList = callService("app_mgt503l5m8", "t_leadership_team_be3q6bno_selectMore", JsonOutput.toJson([
    page_index: 1,
    page_size: 100,
    query_criteria: [
      [
        column_name: "t_election_records_id",
        value: [currentTermId],
        query_type: 0
      ]
    ]
  ]))
  logger.info("领导班子列表: " + leadershipList)
  // 创建领导班子成员映射
  def leadershipMap = leadershipList?.collectEntries { [it.name_id, it.position_code ?: ''] } ?: [:]
  logger.info("领导班子成员映射: " + leadershipMap)
  // 查询并更新党员信息
  memberTransferHistory?.each { history ->
    def positionCodeToSet = leadershipMap.get(history.uid ?: '', '')
    updateMemberPosition(history.uid_mth, orgCategoryCode, positionCodeToSet)
  }
} else {
  // 未找到当前届信息，将所有党员的职务置为空
  memberTransferHistory?.each { history ->
    updateMemberPosition(history.uid_mth, orgCategoryCode, '')
  }
}