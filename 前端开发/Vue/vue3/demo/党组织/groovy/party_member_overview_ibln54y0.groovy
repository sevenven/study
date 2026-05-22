import groovy.json.JsonOutput

def cellId = ${__input__.cellId}
def branchId = ${__input__.branchId}
def committeeId = ${__input__.committeeId}

logger.info("Groovy版本: " + GroovySystem.version + ", 输入参数: " + JsonOutput.toJson(__input__))

// 创建组织ID查询条件函数 - 修改为接收参数
def createOrgCriteria(cellId, branchId, committeeId) {
  def orgCriteria = []
  if (cellId) {
    orgCriteria.add([
      "column_name_list": null,
      "column_name": "cell_id",
      "value": [cellId],
      "query_type": 0
    ])
  } else if (branchId) {
    orgCriteria.add([
      "column_name_list": null,
      "column_name": "branch_id",
      "value": [branchId],
      "query_type": 0
    ])
  } else if (committeeId) {
    orgCriteria.add([
      "column_name_list": null,
      "column_name": "committee_id",
      "value": [committeeId],
      "query_type": 0
    ])
  }

  return orgCriteria
}

// 构建基础请求参数函数
def buildRequestParams(criteria) {
  def paramsMap = [
    page_index: 1,
    page_size: 5000,
    sort_criteria: ["create_time": "DESC"],
    query_criteria: criteria, // 直接传入 criteria 对象
    filter_sql: null,
    data_filters: [],
    permission_filters: []
  ]
  // 使用 JsonOutput.toJson 将 Map 转换为 JSON 字符串
  return JsonOutput.toJson(paramsMap)
}

// 获取组织ID查询条件 - 传入必要参数
def orgCriteria = createOrgCriteria(cellId, branchId, committeeId)

// 1. 查询当前党员数据 
def currentMemberCriteria = [[
  "column_name_list": null,
  "column_name": "is_current",
  "value": ['1', '3'],
  "query_type": 3
], [
  "column_name_list": null,
  "column_name": "process_status",
  "value": ['DRAFT'],
  "query_type": 11
]]
currentMemberCriteria.addAll(orgCriteria)
def currentMemberParams = buildRequestParams(currentMemberCriteria)
def currentMembersResult = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf_customCount", currentMemberParams)

// 2. 查询历史党员数据
def historicalMemberCriteria = []
// 根据入参类型调整历史党员查询条件
if (committeeId) {
  // 当入参是committeeId时，查询条件为party_member_source_code='external_transfer_out'
  historicalMemberCriteria = [[
    "column_name_list": null,
    "column_name": "party_member_source_code",
    "value": ["external_transfer_out"],
    "query_type": 0
  ], [
    "column_name_list": null,
    "column_name": "is_current",
    "value": ["1"],
    "query_type": 0
  ]]
} else if (cellId) {
  // 当入参是cellId或branchId时，查询条件为is_current='0'
  historicalMemberCriteria = [[
		"column_name_list": null,
		"column_name": "is_current",
		"value": ['0'],
		"query_type": 0
	]]
	historicalMemberCriteria.addAll(orgCriteria)
}
def historicalMembersResult = [total: -1]
// 只有传入committeeId或cellId时才请求历史党员数据
if (committeeId || cellId) {
  historicalMembersResult = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf_customCount", buildRequestParams(historicalMemberCriteria))
}

// 3. 分别查询当前正式党员和预备党员
def officialMemberCriteria = [[
  "column_name_list": null,
	"column_name": "is_current",
  "value": ['1', '3'],
  "query_type": 3
], [
  "column_name_list": null,
  "column_name": "political_status_code",
  "value": ["full"],
  "query_type": 0
],  [
  "column_name_list": null,
  "column_name": "process_status",
  "value": ['DRAFT'],
  "query_type": 11
]]
officialMemberCriteria.addAll(orgCriteria)
def officialMemberParams = buildRequestParams(officialMemberCriteria)
def officialMembersResult = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf_customCount", officialMemberParams)

def probationaryMemberCriteria = [[
  "column_name_list": null,
  "column_name": "is_current",
 	"value": ['1', '3'],
  "query_type": 3
], [
  "column_name_list": null,
  "column_name": "political_status_code",
  "value": ["probationary"],
  "query_type": 0
], [
  "column_name_list": null,
  "column_name": "process_status",
  "value": ['DRAFT'],
  "query_type": 11
]]
probationaryMemberCriteria.addAll(orgCriteria)
def probationaryMemberParams = buildRequestParams(probationaryMemberCriteria)
def probationaryMembersResult = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf_customCount", probationaryMemberParams)

// 查询当前党员中的党务工作者人数 is_party_worker='1'
def partyWorkerCriteria = [[
  "column_name_list": null,
  "column_name": "is_current",
  "value": ['1'],
  "query_type": 0
], [
  "column_name_list": null,
  "column_name": "is_party_worker",
  "value": ['1'],
  "query_type": 0
], [
  "column_name_list": null,
  "column_name": "process_status",
  "value": ['DRAFT'],
  "query_type": 11
]]
partyWorkerCriteria.addAll(orgCriteria)
def partyWorkerParams = buildRequestParams(partyWorkerCriteria)
def partyWorkerResult = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf_customCount", partyWorkerParams)

// 构建并返回综合结果
return [
  currentMembers: currentMembersResult.total,
  historicalMembers: historicalMembersResult.total,
  officialMembers: officialMembersResult.total,
  probationaryMembers: probationaryMembersResult.total,
  partyWorkers: partyWorkerResult.total
]