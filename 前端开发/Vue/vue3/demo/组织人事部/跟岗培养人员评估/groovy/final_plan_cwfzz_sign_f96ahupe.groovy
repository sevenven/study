import groovy.json.JsonOutput

// 从输入获取计划ID（假设前端传入 planId）
def planId = ${__input__.planId}
def agreeUserId = ${__input__.agreeUserId}

if (!planId) {
  logger.error("缺少必要参数 planId")
  return
}

// 更新计划的常务副组长审批人
def updateResult = callService(
  "app_yqtmuhmhwy",
  "t_final_plan_1cwu93rl_update",
  [uid: planId, executive_deputy_approver_id: agreeUserId]
)

