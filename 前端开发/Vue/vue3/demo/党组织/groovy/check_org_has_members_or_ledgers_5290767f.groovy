import groovy.json.JsonOutput

def curOrgId = ${__input__.curOrgId}
def orgCategoryCode = ${__input__.orgCategoryCode}

logger.info("Groovy版本: " + GroovySystem.version + ", curOrgId: " + curOrgId)

def queryKey = 'cell_id'
if (orgCategoryCode == 'party_cell') {
  queryKey = 'cell_id'
} else if (orgCategoryCode == 'party_branch') {
  queryKey = 'branch_id'
} else if (orgCategoryCode == 'party_committee') {
  queryKey = 'committee_id'
}

// 使用动态查询键查询党员
def partyMembers = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 1, // 只需要检查是否存在党员，不需要获取全部
  "query_criteria": [
    [
      "column_name": queryKey,
      "value": [curOrgId],
      "query_type": 0
    ]
  ]
]))

// 简洁判断是否有党员并记录日志
boolean hasMembers = !partyMembers.isEmpty()
logger.info("当前组织(ID: " + curOrgId + ") " + (hasMembers ? "有党员" : "没有党员"))

// 获取当前组织是否有台账
def organizationLedgers = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_selectMore", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 1, // 只需要检查是否存在台账，不需要获取全部
  "query_criteria": [
    [
      "column_name": 'party_organizations_id',
      "value": [curOrgId],
      "query_type": 0
    ]
  ]
]))

// 简洁判断是否有台账并记录日志
boolean hasLedgers = !organizationLedgers.isEmpty()
logger.info("当前组织(ID: " + curOrgId + ") " + (hasLedgers ? "有台账" : "没有台账"))

return [
  "hasMembers": hasMembers,
  "hasLedgers": hasLedgers
]