import groovy.json.JsonOutput

def curOrgId = ${__input__.curOrgId}
def ledgerDate = ${__input__.ledgerDate}

// 优化日志输出，只记录已定义的变量，保留字符串拼接方式
logger.info("Groovy版本: " + GroovySystem.version + ", curOrgId: " + curOrgId + ", ledgerDate: " + ledgerDate)

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

// 初始化统计变量为整数
def memberStats = [
  activist_count: 0,
  member_total_count: 0,
  formal_member_count: 0,
  probationary_member_count: 0,
	party_worker_count: 0
]

// 遍历子组织台账并累加统计数据
if (childLedgers && childLedgers instanceof List && !childLedgers.isEmpty()) {
  childLedgers.each { ledger ->
    // 累加各字段值，确保转换为整数
    memberStats.activist_count += (ledger.activist_count?.toInteger() ?: 0)
    memberStats.member_total_count += (ledger.member_total_count?.toInteger() ?: 0)
    memberStats.formal_member_count += (ledger.formal_member_count?.toInteger() ?: 0)
    memberStats.probationary_member_count += (ledger.probationary_member_count?.toInteger() ?: 0)
    memberStats.party_worker_count += (ledger.party_worker_count?.toInteger() ?: 0)
  }
}  

return memberStats