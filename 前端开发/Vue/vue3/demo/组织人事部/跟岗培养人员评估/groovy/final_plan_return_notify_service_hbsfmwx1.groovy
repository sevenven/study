import groovy.json.JsonOutput

// 从输入获取计划ID（假设前端传入 planId）
def planId = ${__input__.planId}
def returnUserId = ${__input__.returnUserId}
def returnUserName = ${__input__.returnUserName}
def returnReason = ${__input__.returnReason}

if (!planId) {
  logger.error("缺少必要参数 planId")
  return
}

// 查询计划主表数据
def plan = callService(
  "app_yqtmuhmhwy",
  "t_final_plan_1cwu93rl_selectOne",
  [uid: planId]
)

// 更新业务状态为“已退回”
def updateResult = callService(
  "app_yqtmuhmhwy",
  "t_final_plan_1cwu93rl_update",
  [uid: planId, final_plan_status_code: "returned"]
)

logger.info("更新状态结果: " + updateResult)

// 提取通知所需字段
def planUserId = plan.plan_user_id?.toString()
def planYearTimestamp = plan.plan_year?.toLong()
def planTypeCode = plan.plan_type_code
def mentorId = plan.mentor_id?.toString()
def coachId = plan.coach_id?.toString()

if (!planUserId || !planYearTimestamp || !planTypeCode || !mentorId || !coachId) {
  logger.error("计划数据不完整，无法发送通知")
  return
}

// 构建通知用户列表，过滤掉退回人
def notifyUserIds = [planUserId]
if (mentorId && mentorId != returnUserId) {
  notifyUserIds.add(mentorId)
}
if (coachId && coachId != returnUserId) {
  notifyUserIds.add(coachId)
}

// 获取年份
def calendar = Calendar.getInstance()
calendar.setTimeInMillis(planYearTimestamp)
def planYear = calendar.get(Calendar.YEAR)

// 计划类型中文
def planType = planTypeCode == "sep_plan" ? "期末标志性计划表" : "IDP管理能力提升计划表"

def content = "【跟岗评估】：您的" + planYear + "年度" + planType + "已被" + returnUserName + "退回\n" +
        "【退回原因】：" + returnReason + "。\n请前往“工作台-全部应用-业务系统-智改数转-跟岗评估-期末评估-期末计划”中进行查看"

// 发送钉钉通知
callService(
  "app_yqtmuhmhwy",
  "notify_JfCunmvd",
  [
    msg_type: "text",
    content: content,
    userid_list: notifyUserIds.unique().join(","),
    dept_id_list: ""
  ]
)

logger.info("通知发送成功，planId: ${planId}, user: ${planUserId}")