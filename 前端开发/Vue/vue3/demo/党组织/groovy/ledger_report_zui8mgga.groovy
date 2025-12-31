import groovy.json.JsonOutput

def uid = ${__input__.uid}

logger.info("Groovy版本: " + GroovySystem.version + ", uid: " + uid)

// 根据uid查询台账信息
def ledgerResult = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_selectOne", [uid: uid]);
// logger.info("台账信息: " + ledgerResult)

// 根据party_organizations_id查询党组织信息
def partyOrganizationInfo = callService("app_mgt503l5m8", "t_party_organizations_sa03199q", [uid: ledgerResult.party_organizations_id]);
// logger.info("党组织信息: " + partyOrganizationInfo)

// 查询该党组织在上报台账的月份是否有上报记录
def organizationLedgers = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_selectMore", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 100,
  "query_criteria": [
		[
			"column_name_list": null,
			"column_name": "party_organizations_id",
			"value": [partyOrganizationInfo.parent_party_org_id],
			"query_type": 0
		],
		[
			"column_name_list": null,
			"column_name": "ledger_date",
			"value": [ledgerResult.ledger_date],
			"query_type": 0
		]
	]]))
logger.info("查询结果: " + organizationLedgers)

// 检查是否存在记录，如果不存在则生成一条台账信息
if (organizationLedgers && organizationLedgers.size() > 0) {
  logger.info("该组织在当前月份已有上报记录，记录数量: " + organizationLedgers.size())
} else {
  logger.info("该组织在当前月份没有上报记录，需要生成新的台账信息")
  // 调用服务创建新的台账记录
  def createResult = callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_insert", [
    party_organizations_id: partyOrganizationInfo.parent_party_org_id,
    org_full_name: partyOrganizationInfo.parent_party_org_name,
		org_category_code: partyOrganizationInfo.parent_org_category_code,
		committee_id: partyOrganizationInfo.parent_org_category_code == "party_committee" ? partyOrganizationInfo.parent_party_org_id : '',
		branch_id: partyOrganizationInfo.parent_org_category_code == "party_branch" ? partyOrganizationInfo.parent_party_org_id : '',
		parent_org_category_code: partyOrganizationInfo.parent_org_category_code == "party_cell" ? "party_branch" : "party_committee",
    ledger_date: ledgerResult.ledger_date,
		ledger_gen_status: '0',
		is_reported_to_committee: '0',
		is_reported_to_branch: '0',
		sort_weight: partyOrganizationInfo.parent_org_category_code == "party_committee" ? '3' : '2',
		creator: ledgerResult.creator,
		sys_deleted: 0,
		process_status: 'DRAFT',
  ])
  logger.info("新台账记录创建结果: " + createResult)
}

// 根据组织类型动态更新当前上报台账信息
def updateParams = [uid: ledgerResult.uid]
// 根据组织类型动态添加不同参数
switch (partyOrganizationInfo.parent_org_category_code) {
  case "party_committee":
    updateParams.is_reported_to_committee = "1"
    updateParams.report_to_committee_time = new Date().getTime()
    break
  case "party_branch":
    updateParams.is_reported_to_branch = "1"
    updateParams.report_to_branch_time = new Date().getTime()
    break
  default:
    logger.warn("未知的组织类型")
}
callService("app_mgt503l5m8", "t_organization_ledgers_rblschqz_update", updateParams)
