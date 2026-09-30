import groovy.json.JsonOutput

def sourceUid = ${__input__.uid}
def appId = "app_mgt503l5m8"

logger.info("Groovy版本: " + GroovySystem.version)

if (!sourceUid) {
  logger.warn("sourceUid 为空")
  return
}

// 1. 查主表
def source = callService(appId, "t_project_select_motion_9ohn4ymc_selectOne", [uid: sourceUid])
if (!source) {
  logger.warn("未找到源记录")
  return
}

// 2. 解构：去掉系统字段，保留业务字段
def exclude = ['uid', 'id', 'create_time', 'update_time', 'sys_update_user', 'sys_audit_user', 'sys_audit_time']
def newMotion = source.findAll { k, v -> !exclude.contains(k) }

def insertResult = callService(appId, "t_project_select_motion_9ohn4ymc_insert", newMotion)
logger.info("insertResult: " + insertResult)

def newMotionUid = insertResult?.uid ?: insertResult?.data?.uid
if (!newMotionUid && insertResult instanceof List && insertResult) {
  newMotionUid = insertResult[0]?.uid ?: insertResult[0]?.data?.uid
}
if (!newMotionUid) {
  logger.warn("未拿到新 uid, ret=" + insertResult)
  return
}

// 3. 查子表
def suppliers = callService(appId, "t_invited_suppliers_info_uc8g08lq_selectMore", JsonOutput.toJson([
  page_index: 1,
  page_size: 1000,
  query_criteria: [[
    column_name_list: null,
    column_name: "t_project_select_motion_9ohn4ymc_id",
    value: [sourceUid],
    query_type: 0
  ]]
])) ?: []

// 4. 子表同样解构复制，换外键
suppliers.each { s ->
  def newSub = s.findAll { k, v -> !exclude.contains(k) }
  newSub.t_project_select_motion_9ohn4ymc_id = newMotionUid
  callService(appId, "t_invited_suppliers_info_uc8g08lq_insert", newSub)
}

logger.info("复制完成 newMotionUid=" + newMotionUid + ", 子表=" + suppliers.size())
