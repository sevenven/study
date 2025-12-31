import groovy.json.JsonOutput

def curOrgId = ${__input__.curOrgId}
def ledgerDate = ${__input__.ledgerDate}

// 优化日志输出，只记录已定义的变量，保留字符串拼接方式
logger.info("Groovy版本: " + GroovySystem.version + ", curOrgId: " + curOrgId + ", ledgerDate: " + ledgerDate)

def childOrganizations = callService("app_mgt503l5m8", "t_party_organizations_hphy2adu", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 100,
  "query_criteria": [
    [
      "column_name": "parent_id",
      "value": [curOrgId],
      "query_type": 0
    ],
    [
      "column_name": "org_status_code",
      "value": ['operational'],
      "query_type": 0
    ]
  ]
]))
// logger.info("子组织: " + childOrganizations)

def childLedgers = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_selectMore", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 100,
  "query_criteria": [
    [
      "column_name": "parent_id",
      "value": [curOrgId],
      "query_type": 0
    ],
    [
      "column_name": "ledger_date",
      "value": [ledgerDate],
      "query_type": 0
    ]
  ]
]))
// logger.info("子台账: " + childLedgers)

// 1. 创建已生成台账的组织ID集合，方便快速查找
def ledgerOrgIds = []
if (!childLedgers.isEmpty()) ledgerOrgIds = childLedgers.collect { it.party_organizations_id }.findAll { it != null }
// logger.info("已生成台账的组织: " + ledgerOrgIds)
// 2. 找出未生成台账的组织
def organizationsWithoutLedgers = []
if (!childOrganizations.isEmpty()) organizationsWithoutLedgers = childOrganizations.findAll { org -> !ledgerOrgIds.contains(org.uid)}
// logger.info("未生成台账的组织: " + organizationsWithoutLedgers)

// 3. 找出已生成台账但未上报的组织
def organizationsWithUnreportedLedgers = []
if (childLedgers && childLedgers instanceof List && !childLedgers.isEmpty()) {
  organizationsWithUnreportedLedgers = childLedgers.findAll { ledger ->
    // 根据组织类型判断上报状态
    if (ledger.parent_org_category_code == 'party_branch') {
      // 党小组需要向上级党支部上报
      return ledger.is_reported_to_branch != '1'
    } else if (ledger.parent_org_category_code == 'party_committee') {
      // 党支部需要向上级党委上报
      return ledger.is_reported_to_committee != '1'
    }
    return false // 其他类型暂不处理
  }
}
// logger.info("已生成台账但未上报的组织: " + organizationsWithUnreportedLedgers)

return [
  organizationsWithoutLedgers: organizationsWithoutLedgers,
  organizationsWithUnreportedLedgers: organizationsWithUnreportedLedgers
]