import groovy.json.JsonOutput
def uidMth = ${__input__.uidMth} // 转出到外部组织的记录ID

logger.info("Groovy版本: " + GroovySystem.version + ", 输入参数: " + JsonOutput.toJson(__input__))

def nextTransferRecords = callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_selectMore", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 1, 
  "query_criteria": [
    [
      "column_name": 'prev_record_id',
      "value": [uidMth],
      "query_type": 0
    ]
  ]
]))

logger.info("转出到外部组织的下一条记录: " + JsonOutput.toJson(nextTransferRecords))

return nextTransferRecords.size() > 0;