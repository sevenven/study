import groovy.json.JsonOutput

// ==================== 输入参数 ====================
def planId      = ${__input__.planId}
def agreeUserId = ${__input__.agreeUserId}

if (!planId) {
	logger.error("缺少必要参数 planId")
	return
}

// 1. 查询当前计划
def plan = callService(
	"app_yqtmuhmhwy",
	"t_final_plan_1cwu93rl_selectOne",
	[uid: planId]
)

if (!plan) {
	logger.error("未找到计划，planId: " + planId)
	return
}

// 2. 获取计划关键字段
def planUserId   = plan.plan_user_id
def planYear     = plan.plan_year          // 毫秒时间戳
def planTypeCode = plan.plan_type_code
def mentorId     = plan.mentor_id
def coachId      = plan.coach_id

// 3. 判断 agreeUserId 是导师还是教练，并更新对应的审批人字段
def needUpdate = false
def updateParams = [uid: planId]

if (agreeUserId && mentorId && agreeUserId.toString() == mentorId.toString()) {
	updateParams.mentor_approver_id = agreeUserId
	needUpdate = true
	logger.info("agreeUserId 匹配 mentor_id，设置 mentor_approver_id")
}
if (agreeUserId && coachId && agreeUserId.toString() == coachId.toString()) {
	updateParams.coach_approver_id = agreeUserId
	needUpdate = true
	logger.info("agreeUserId 匹配 coach_id，设置 coach_approver_id")
}

if (needUpdate) {
	callService("app_yqtmuhmhwy", "t_final_plan_1cwu93rl_update", updateParams)
	// 重新查询最新的计划数据，以便获取最新的 mentor_approver_id / coach_approver_id
	plan = callService("app_yqtmuhmhwy", "t_final_plan_1cwu93rl_selectOne", [uid: planId])
} else {
	logger.warn("agreeUserId 既不匹配导师也不匹配教练，不做任何操作")
	return
}

// 4. 只有导师和教练都完成审批，才更新状态并发送通知
def mentorApproved = plan.mentor_approver_id && plan.mentor_approver_id.toString().trim() != ''
def coachApproved  = plan.coach_approver_id && plan.coach_approver_id.toString().trim() != ''

if (!(mentorApproved && coachApproved)) {
	logger.info("导师和教练尚未全部审批，不更新状态。 mentor_approver_id: " + plan.mentor_approver_id + ", coach_approver_id: " + plan.coach_approver_id)
	return
}

// 5. 更新业务状态为“已确认”
def updateStatusResult = callService(
	"app_yqtmuhmhwy",
	"t_final_plan_1cwu93rl_update",
	[uid: planId, final_plan_status_code: "confirmed"]
)
logger.info("更新状态为 confirmed 结果: " + updateStatusResult)

// 6. 发送钉钉通知
def planUserIdStr      = planUserId?.toString()
def planYearTimestamp  = planYear?.toLong()
if (!planUserIdStr || !planYearTimestamp || !planTypeCode) {
	logger.error("计划数据不完整，无法发送通知")
	return
}

def calendar = Calendar.getInstance()
calendar.setTimeInMillis(planYearTimestamp)
def year = calendar.get(Calendar.YEAR)
def planTypeName = planTypeCode == "sep_plan" ? "期末标志性事件计划" : "期末个人管理力提升（IDP）计划"

def content = "【跟岗培养-期末计划】：您的" + year + "年度" + planTypeName + "已确认。\n" + "请前往“工作台-全部应用-业务系统-智改数转-跟岗评估-期末评估-期末计划”中进行查看。"

callService(
	"app_yqtmuhmhwy",
	"notify_JfCunmvd",
	[
		msg_type    : "text",
		content     : content,
		userid_list : planUserIdStr,
		dept_id_list: ""
	]
)

logger.info("通知发送成功，planId: " + planId + ", user: " + planUserIdStr)