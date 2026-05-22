import groovy.json.JsonOutput

def uid = ${__input__.uid}

logger.info("Groovy版本: " + GroovySystem.version + ", uid: " + uid)

// 根据uid查询台账信息
def ledgerResult = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_selectOne", [uid: uid])
logger.info("台账信息: " + ledgerResult)

// 根据party_organizations_id查询党组织信息
def partyOrganizationInfo = callService("app_mgt503l5m8", "t_party_organizations_sa03199q", [uid: ledgerResult.party_organizations_id])
logger.info("党组织信息: " + partyOrganizationInfo)

// 动态设置“取消上报”参数（重置标记与时间）
def updateParams = [uid: ledgerResult.uid]
switch (partyOrganizationInfo.parent_org_category_code) {
  case "party_committee":
    updateParams.is_reported_to_committee = "0"
    updateParams.report_to_committee_time = null
    logger.info("取消上报至党委")
    break
  case "party_branch":
    updateParams.is_reported_to_branch = "0"
    updateParams.report_to_branch_time = null
    logger.info("取消上报至党总支")
    break
  default:
    logger.warn("未知的父组织类型: " + partyOrganizationInfo.parent_org_category_code)
}
callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_update", updateParams)
logger.info("当前台账取消上报完成: " + updateParams)

// 若当前组织类型是党总支，则同步取消其下属台账的“上报至党委”
if (partyOrganizationInfo.org_category_code == "party_branch") {
  def relatedLedgers = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_selectMore", JsonOutput.toJson([
    "page_index": 1,
    "page_size": 1000,
    "query_criteria": [
      [
        "column_name_list": null,
        "column_name": "parent_id",
        "value": [ledgerResult.party_organizations_id],
        "query_type": 0
      ],
      [
        "column_name_list": null,
        "column_name": "ledger_date",
        "value": [ledgerResult.ledger_date],
        "query_type": 0
      ]
    ]
  ]))

  logger.info("需同步取消的相关台账记录数量: " + (relatedLedgers ? relatedLedgers.size() : 0))

  if (relatedLedgers && relatedLedgers.size() > 0) {
    relatedLedgers.each { ledger ->
      callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_update", [
        uid: ledger.uid,
        is_reported_to_committee: "0",
        report_to_committee_time: null
      ])
    }
    logger.info("相关台账已同步取消上报至党委")
  }
}

logger.info("台账取消上报流程执行完毕")