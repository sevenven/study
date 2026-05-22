import groovy.json.JsonOutput

def uid = ${__input__.uid} // 评估 ID

callService("app_yqtmuhmhwy", "t_final_evaluation_l76l0srb_update", [uid: uid, final_evaluation_status_code: 'not_started'])
