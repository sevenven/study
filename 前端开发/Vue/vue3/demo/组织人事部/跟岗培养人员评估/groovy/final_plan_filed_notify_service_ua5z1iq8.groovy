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

// 4. 根据计划类型构建测评记录的关联字段
def sepPlanId = ""
def idpPlanId = ""
def queryColumn = ""   // 用于查询已有测评记录的字段名
def queryValue = ""    // 对应的值

if (planTypeCode == "sep_plan") {
  sepPlanId = planId
  idpPlanId = ""
  queryColumn = "sep_plan_id"
  queryValue = planId
} else if (planTypeCode == "idp_plan") {
  sepPlanId = ""
  idpPlanId = planId
  queryColumn = "idp_plan_id"
  queryValue = planId
} else {
  logger.error("未知的计划类型: " + planTypeCode)
  return
}

// 5. 检查是否已存在关联当前计划的测评记录
def existEvaluations = callService(
  "app_yqtmuhmhwy",
  "t_final_evaluation_l76l0srb_selectMore",
  JsonOutput.toJson([
    page_index: 1,
    page_size: 1,
    query_criteria: [
      [column_name: queryColumn, value: [queryValue], query_type: 0],
      [column_name: "sys_deleted", value: [0], query_type: 0]   // 只查未删除的
    ]
  ])
)

if (existEvaluations && existEvaluations.size() > 0) {
  // 更新已存在测评记录的 creator（或其他必要字段）
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
  // 6. 创建新的测评记录（草稿态）
  def createEvalResult = callService(
    "app_yqtmuhmhwy",
    "t_final_evaluation_l76l0srb_insert",
    [
      sep_plan_id: planTypeCode == "sep_plan" ? sepPlanId : "",
      idp_plan_id: planTypeCode == "idp_plan" ? idpPlanId : "",
      plan_stage_code: plan.plan_stage_code,
			plan_type_code: planTypeCode,
      plan_user_id: planUserId,
      plan_year: planYear,
      plan_year_name: plan.plan_year_name,
			plan_stage_name: plan.plan_stage_name,
			plan_type_name: plan.plan_type_name,
			final_evaluation_status_code: "not_started",
      process_status: "DRAFT",
      creator: planUserId,
      sys_deleted: 0
    ]
  )
  logger.info("测评记录创建结果: " + createEvalResult)
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
def planTypeName = planTypeCode == "sep_plan" ? "期末标志性事件计划" : "期末个人管理能提升（IDP）计划"

def content = "【跟岗培养-期末计划】：您的" + year + "年度" + planTypeName + "已备案。\n" +
        "请前往“工作台-全部应用-业务系统-智改数转-跟岗评估-期末评估-期末计划”中进行查看。"

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