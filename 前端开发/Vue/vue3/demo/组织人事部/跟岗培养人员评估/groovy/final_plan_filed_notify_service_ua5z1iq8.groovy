import groovy.json.JsonOutput

def planId = ${__input__.planId}

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

// 2. 更新业务状态为“已备案”
def updateResult = callService(
  "app_yqtmuhmhwy",
  "t_final_plan_1cwu93rl_update",
  [uid: planId, final_plan_status_code: "filed"]
)
logger.info("更新状态结果: " + updateResult)

// 3. 提取当前计划的关键字段
def planUserId = plan.plan_user_id
def planYear = plan.plan_year          // 时间戳（毫秒）
def planTypeCode = plan.plan_type_code // "sep_plan" 或 "idp_plan"
def planStageCode = plan.plan_stage_code

// 4. 检查同一用户同一年度的另一类型计划是否也已审核完成
def oppositeType = planTypeCode == "sep_plan" ? "idp_plan" : "sep_plan"
def oppositePlans = callService(
  "app_yqtmuhmhwy",
  "t_final_plan_1cwu93rl_selectMore",
  JsonOutput.toJson([
    page_index: 1,
    page_size: 1,
    query_criteria: [
      [column_name: "plan_user_id", value: [planUserId], query_type: 0],
      [column_name: "plan_year", value: [planYear], query_type: 0],
      [column_name: "plan_type_code", value: [oppositeType], query_type: 0],
      // 审核完成状态：已备案或已确认
      [column_name: "final_plan_status_code", value: ["filed"], query_type: 0] // query_type 10 表示 IN
    ]
  ])
)

def oppositePlan = oppositePlans && oppositePlans.size() > 0 ? oppositePlans[0] : null
if (!oppositePlan) {
  logger.info("另一类型计划尚未审核完成，暂不创建测评记录")
} else {
  // 5. 检查是否已存在关联这两个计划的测评记录
  def sepPlanId = planTypeCode == "sep_plan" ? planId : oppositePlan.uid
  def idpPlanId = planTypeCode == "idp_plan" ? planId : oppositePlan.uid

  def existEvaluations = callService(
    "app_yqtmuhmhwy",
    "t_final_evaluation_l76l0srb_selectMore",
    JsonOutput.toJson([
      page_index: 1,
      page_size: 1,
      query_criteria: [
        [column_name: "sep_plan_id", value: [sepPlanId], query_type: 0],
        [column_name: "idp_plan_id", value: [idpPlanId], query_type: 0]
      ]
    ])
  )

  if (existEvaluations && existEvaluations.size() > 0) {
    // 更新已存在测评记录的 creator
    def existEval = existEvaluations[0]
    def updateEvalResult = callService(
      "app_yqtmuhmhwy",
      "t_final_evaluation_l76l0srb_update",
      [
        uid: existEval.uid,
        creator: planUserId
      ]
    )
    logger.info("测评记录已更新，uid: " + existEval.uid + ", creator: " + planUserId)
  } else {
    // 6. 创建草稿态测评记录
    def createEvalResult = callService(
      "app_yqtmuhmhwy",
      "t_final_evaluation_l76l0srb_insert",
      [
        sep_plan_id: sepPlanId,
        idp_plan_id: idpPlanId,
        plan_stage_code: planStageCode,
        plan_user_id: planUserId,
        plan_year: planYear,
        final_evaluation_status_code: "not_started",   // 未开始
        process_status: "DRAFT",
				creator: planUserId,
        sys_deleted: 0
      ]
    )
    logger.info("测评记录创建结果: " + createEvalResult)
  }
}

// 7. 发送钉钉通知
def planUserIdStr = planUserId?.toString()
def planYearTimestamp = planYear?.toLong()
if (!planUserIdStr || !planYearTimestamp || !planTypeCode) {
  logger.error("计划数据不完整，无法发送通知")
  return
}

def calendar = Calendar.getInstance()
calendar.setTimeInMillis(planYearTimestamp)
def year = calendar.get(Calendar.YEAR)
def planTypeName = planTypeCode == "sep_plan" ? "期末标志性计划表" : "IDP管理能力提升计划表"

def content = "【跟岗评估】：您的" + year + "年度" + planTypeName + "已备案！\n" +
        "请前往“工作台-全部应用-业务系统-智改数转-跟岗评估-期末评估-期末计划”中进行查看"

callService(
  "app_yqtmuhmhwy",
  "notify_JfCunmvd",
  [
    msg_type: "text",
    content: content,
    userid_list: planUserIdStr,
    dept_id_list: ""
  ]
)

logger.info("通知发送成功，planId: " + planId + ", user: " + planUserIdStr)