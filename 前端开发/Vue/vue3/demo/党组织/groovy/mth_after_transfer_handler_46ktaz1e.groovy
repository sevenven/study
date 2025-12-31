import groovy.json.JsonOutput

def partyMembersBaseId = ${__input__.partyMembersBaseId}
def fromCellId = ${__input__.fromCellId}
def cellId = ${__input__.cellId}
def newMthUid = ${__input__.newMthUid}

logger.info("Groovy版本: " + GroovySystem.version + ", 输入参数 - partyMembersBaseId: " + partyMembersBaseId + ", fromCellId: " + fromCellId + ", cellId: " + cellId);

def fromCellCur = callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_selectMore", JsonOutput.toJson([
	"page_index": 1,
	"page_size": 1,
	"query_criteria": [
		[
			"column_name_list": null,
			"column_name": "t_party_members_base_id",
			"value": [partyMembersBaseId],
			"query_type": 0
		],
		[
			"column_name_list": null,
			"column_name": "is_current",
			"value": ['3'],
			"query_type": 0
		],
		[
			"column_name_list": null,
			"column_name": "cell_id",
			"value": [fromCellId],
			"query_type": 0
		]
	]
]))
logger.info("fromCellCur: " + fromCellCur)

def cellHistory = callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_selectMore", JsonOutput.toJson([
	"page_index": 1,
	"page_size": 1,
	"query_criteria": [
		[
			"column_name_list": null,
			"column_name": "t_party_members_base_id",
			"value": [partyMembersBaseId],
			"query_type": 0
		],
		[
			"column_name_list": null,
			"column_name": "is_current",
			"value": ['0'],
			"query_type": 0
		],
		[
			"column_name_list": null,
			"column_name": "cell_id",
			"value": [cellId],
			"query_type": 0
		]
	]
]))
logger.info("cellHistory: " + cellHistory)

// 更新党组织关系转移表中其他记录的is_current字段
fromCellCur[0] && callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [uid: fromCellCur[0].uid, is_current: '0'])
cellHistory.eachWithIndex { record, index ->
	callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [uid: record.uid, is_current: '5'])
}
callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [uid: newMthUid, is_current: '1'])

// 查询fromCell党组织信息
def fromCellInfo = callService("app_mgt503l5m8", "t_party_organizations_sa03199q", [uid: fromCellId]);
def cellInfo = callService("app_mgt503l5m8", "t_party_organizations_sa03199q", [uid: cellId]);
logger.info("fromCellInfo: " + fromCellInfo);

// 获取当前届信息的函数
def getCurrentTerm(partyOrgId) {
  return callService("app_mgt503l5m8", "t_election_records_zn2e5kuu_selectMore", JsonOutput.toJson([
    "page_index": 1,
    "page_size": 1,
    "query_criteria": [
      [
        "column_name_list": null,
        "column_name": "party_organizations_id",
        "value": [partyOrgId],
        "query_type": 0 // 精确匹配查询
      ],
      [
        "column_name_list": null,
        "column_name": "is_current",
        "value": ["1"],
        "query_type": 0 // 精确匹配查询
      ]
    ]
  ]))
}

// 获取领导班子信息的函数
def getLeadershipList(termId) {
  return callService("app_mgt503l5m8", "t_leadership_team_be3q6bno_selectMore", JsonOutput.toJson([
    "page_index": 1,
    "page_size": 100,
    "query_criteria": [
      [
        "column_name_list": null,
        "column_name": "t_election_records_id",
        "value": [termId],
        "query_type": 0 // 精确匹配查询
      ]
    ]
  ]))
}

// 发送通知的函数
def sendNotification(termInfo, orgName, termPeriod, leader, adminIds) {
  def idList = []
  if (leader) idList.add(leader)
  if (adminIds) idList.addAll(adminIds.split('#@#'))

	def calendar = Calendar.getInstance()
	def year = calendar.get(Calendar.YEAR)
	def month = calendar.get(Calendar.MONTH) + 1
	def day = calendar.get(Calendar.DAY_OF_MONTH)
	def hour = calendar.get(Calendar.HOUR_OF_DAY)
	def minute = calendar.get(Calendar.MINUTE)
	def currentTime = String.format("%04d-%02d-%02d %02d:%02d", year, month, day, hour, minute)
  
  callService("app_mgt503l5m8", "notify_dofDSlb8", [
    msg_type: "text",
    content: "【党组织-换选届提醒】\n" + 
						 "通知主题：" + orgName + "换选届领导班子职务空缺提醒\n" +
						 "提醒内容：请在钉钉\"工作台-全部应用-业务系统-智改数转-党组织管理\"中更新" + orgName + "组织" + termPeriod + "届领导班子信息\n" +
						 "提醒时间：" + currentTime,
    userid_list: idList.unique().join(','),
    dept_id_list: ""
  ])
}

// 处理领导班子的通用函数
def handleLeadership(partyMembersBaseId, fromCellCur, orgId, orgName, leader, adminIds, positionFields) {
  // 获取当前届信息
  def curTerm = getCurrentTerm(orgId)
  
  // 如果存在当前届信息 获取当前届领导班子信息列表
  if (curTerm && curTerm.size() > 0) {
    def leadershipList = getLeadershipList(curTerm[0].uid)
    
    // 遍历领导班子信息列表
    def isMemberFound = false
    leadershipList.each { leadership ->
      if (leadership.name_id == partyMembersBaseId) {
        isMemberFound = true;
        // 删除该领导班子信息
        def deleteResult = callService("app_mgt503l5m8", "t_leadership_team_be3q6bno_update", [uid: leadership.uid, sys_deleted: 1])
        // 当前换选届委员书记配备数减1
        callService("app_mgt503l5m8", "t_election_records_zn2e5kuu_update", [ uid: curTerm[0].uid, current_member_count: curTerm[0].current_member_count - 1 ])
        
        // 更新党员职务信息
        if (fromCellCur[0]) {
          def updateParams = [uid: fromCellCur[0].uid]
          // 动态设置需要清空的职务字段
          positionFields.each { field, value -> updateParams[field] = value }
          callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", updateParams)
        }
      }
    }
		// 发送通知
    if (isMemberFound) sendNotification(curTerm[0], orgName, curTerm[0].term_period, leader, adminIds)
  }
}

// 处理党支部领导班子&职务信息
handleLeadership(
	partyMembersBaseId,
	fromCellCur,
  fromCellId,
  fromCellInfo.org_full_name,
  fromCellInfo.org_leader,
  fromCellInfo.org_admin_id,
  [cell_party_position_code: null, cell_position_weight: 100]
)

// 处理党总支领导班子&职务信息
if (fromCellInfo.parent_org_category_code == 'party_branch' && fromCellInfo.parent_party_org_id != cellInfo.parent_party_org_id) { 
	handleLeadership(
		partyMembersBaseId,
		fromCellCur,
		fromCellInfo.parent_party_org_id,
		fromCellInfo.parent_party_org_name,
		fromCellInfo.parent_org_leader,
		fromCellInfo.parent_org_admin_id,
		[branch_party_position_code: null, branch_position_weight: 100]
	)
 }

