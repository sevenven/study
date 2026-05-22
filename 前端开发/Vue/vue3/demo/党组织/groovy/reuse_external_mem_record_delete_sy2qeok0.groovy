import groovy.json.JsonOutput

def uidMth = ${__input__.uidMth}
def uidPrevMth = ${__input__.uidPrevMth}
def uidNextMth = ${__input__.uidNextMth}

logger.info("Groovy版本: " + GroovySystem.version + ", 输入参数: " + JsonOutput.toJson(__input__))

callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [uid: uidMth, sys_deleted: 1]) // 逻辑删除转出到外部组织的党员信息
callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [uid: uidPrevMth, is_current: '1']) // 更新上一条

def prevMth = callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_selectOne", [uid: uidPrevMth])
if (prevMth && prevMth.prev_record_id) callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [ uid: prevMth.prev_record_id, is_current: '0' ]) // 更新上上一条
if (uidNextMth) callService("app_mgt503l5m8", "t_member_transfer_history_66g3i3yc_update", [ uid: uidNextMth, sys_deleted: 1 ]) // 逻辑删除下一条