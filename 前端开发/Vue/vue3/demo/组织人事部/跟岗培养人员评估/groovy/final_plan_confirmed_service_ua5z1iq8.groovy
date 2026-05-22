import groovy.json.JsonOutput

// 从输入获取计划ID（假设前端传入 planId）
def planId = ${__input__.planId}

if (!planId) {
  logger.error("缺少必要参数 planId")
  return
}

// 更新业务状态为“已备案”
def updateResult = callService(
  "app_yqtmuhmhwy",
  "t_final_plan_1cwu93rl_update",
  [uid: planId, final_plan_status_code: "confirmed"]
)