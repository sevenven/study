import groovy.json.JsonOutput

def cellId = ${__input__.cellId}
def parentId = ${__input__.parentId}
def oldParentId = ${__input__.oldParentId}

logger.info("Groovy版本: " + GroovySystem.version + ", 输入参数 - cellId: " + cellId + ", oldParentId: " + oldParentId + ", parentId: " + parentId);
def calendar = Calendar.getInstance()
def year = calendar.get(Calendar.YEAR)
def month = calendar.get(Calendar.MONTH) + 1
def day = calendar.get(Calendar.DAY_OF_MONTH)
def hour = calendar.get(Calendar.HOUR_OF_DAY)
def minute = calendar.get(Calendar.MINUTE)
def currentTime = String.format("%04d-%02d-%02d %02d:%02d", year, month, day, hour, minute)

// 如果 oldParentId、parentId都不为空且不相等
if (oldParentId && parentId && oldParentId != parentId) {
	// 获取oldParentId当前组织信息
	def oldParentOrg = callService("app_mgt503l5m8", "t_party_organizations_a7f6yk9k_selectOne", [uid: oldParentId])
	if (oldParentOrg.org_category_code == 'party_branch') { // 旧上级党组织类型为党总支
		// 调用服务获取 cellId 下的人员
		def membersResult = callService("app_mgt503l5m8", "t_party_members_base_1gsx1mcf", JsonOutput.toJson([
			"page_index": 1,
			"page_size": 1000,
			"query_criteria": [
				[
					"column_name_list": null,
					"column_name": "cell_id",
					"value": [cellId],
					"query_type": 0 
				],
				[
					"column_name_list": null,
					"column_name": "is_current",
					"value": ['1', '3'],
					"query_type": 3 
				],
				[
					"column_name_list": null,
					"column_name": "process_status",
					"value": ["DRAFT"],
					"query_type": 11
				]
			]
		]))
		// 获取oldParentId当前届期信息
		def oldParentCurrentTerm = callService("app_mgt503l5m8", "t_election_records_zn2e5kuu_selectMore", JsonOutput.toJson([
			"page_index": 1,
			"page_size": 1,
			"query_criteria": [
				[
					"column_name_list": null,
					"column_name": "party_organizations_id",
					"value": [oldParentId],
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
		// 如果存在当前届信息 获取当前届领导班子信息列表
		if (oldParentCurrentTerm && oldParentCurrentTerm.size() > 0) {
			def leadershipList = callService("app_mgt503l5m8", "t_leadership_team_be3q6bno_selectMore", JsonOutput.toJson([
				"page_index": 1,
				"page_size": 100,
				"query_criteria": [
					[
						"column_name_list": null,
						"column_name": "t_election_records_id",
						"value": [oldParentCurrentTerm[0].uid],
						"query_type": 0 // 精确匹配查询
					]
				]
			]))
			// 遍历领导班子信息列表 如果人存在membersResult中 则删除该领导班子信息并将 当前党组织关系的党总支职务清空
			def isMemberFound = false
			def removeCount = 0;
			leadershipList.each { leadership ->
				// 检查领导班子成员是否存在于membersResult中
				def member = membersResult.find { it.uid == leadership.name_id }
				if (member) {
					isMemberFound = true;
					// 删除该领导班子信息
					def deleteResult = callService("app_mgt503l5m8", "t_leadership_team_be3q6bno_update", [uid: leadership.uid, sys_deleted: 1])
					// 计算删除的领导班子人数
					removeCount = removeCount + 1;
					// 将当前党组织关系的党总支职务清空
					callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [
						uid: member.uid_mth,
						branch_party_position_code: null,
						branch_position_weight: 100
					])
				}
			}
			if (isMemberFound) {
				def idList = []
        if (oldParentOrg.org_leader) idList.add(oldParentOrg.org_leader)
        if (oldParentOrg.org_admin_id) idList.addAll(oldParentOrg.org_admin_id)
				// 当前换选届委员书记配备数减removeCount
				callService("app_mgt503l5m8", "t_election_records_zn2e5kuu_update", [ uid: oldParentCurrentTerm[0].uid, current_member_count: oldParentCurrentTerm[0].current_member_count - removeCount ])
				callService("app_mgt503l5m8", "notify_dofDSlb8", [
					msg_type: "text",
					content:"【党组织-换选届提醒】\n" + "通知主题：" + oldParentOrg.org_full_name + "换选届领导班子职务空缺提醒\n提醒内容：请在钉钉\"工作台-全部应用-业务系统-智改数转-党组织管理\"中更新" + oldParentOrg.org_full_name + "组织" + oldParentCurrentTerm[0].term_period + "届领导班子信息\n提醒时间：" + currentTime,
					userid_list: idList.unique().join(','),
					dept_id_list: ""
				])
			}
		}
	}
}