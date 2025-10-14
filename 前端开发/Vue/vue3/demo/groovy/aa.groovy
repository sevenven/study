// 优化参数处理，添加空值检查
def employeeId = ${__input__.employeeId}
def departmentLeaderId = ${__input__.departmentLeaderId}
def departmentManagerId = ${__input__.departmentManagerId}
def hrApproverId = ${__input__.hrApproverId}
def hrManagerId = ${__input__.hrManagerId}
def generalManagerId = ${__input__.generalManagerId}

// 输出参数日志，便于调试
logger.info("参数信息 - employeeId: " + employeeId + ", departmentLeaderId: " + departmentLeaderId + ", departmentManagerId: " + departmentManagerId + ", hrApproverId: " + hrApproverId + ", hrManagerId: " + hrManagerId + ", generalManagerId: " + generalManagerId)

// 查询季度绩效考核填报信息，添加空值检查以避免不必要的服务调用
def employeeAppraisal = employeeId ? callService("app_uxk38fijac", "sxqgl_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"signatory\",\"value\":[\""+employeeId+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}") : null
def departmentLeaderAppraisal = departmentLeaderId ? callService("app_uxk38fijac", "sxqgl_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"signatory\",\"value\":[\""+departmentLeaderId+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}") : null
def departmentManagerAppraisal = departmentManagerId ? callService("app_uxk38fijac", "sxqgl_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"signatory\",\"value\":[\""+departmentManagerId+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}") : null
def hrApproverAppraisal = hrApproverId ? callService("app_uxk38fijac", "sxqgl_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"signatory\",\"value\":[\""+hrApproverId+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}") : null
def hrManagerAppraisal = hrManagerId ? callService("app_uxk38fijac", "sxqgl_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"signatory\",\"value\":[\""+hrManagerId+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}") : null
def generalManagerAppraisal = generalManagerId ? callService("app_uxk38fijac", "sxqgl_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"signatory\",\"value\":[\""+generalManagerId+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}") : null

// 记录各角色的绩效考核结果，仅当结果不为空时记录
if (employeeAppraisal) logger.info("员工绩效考核结果: " + employeeAppraisal);
if (departmentLeaderAppraisal) logger.info("部门负责人绩效考核结果: " + departmentLeaderAppraisal);
if (departmentManagerAppraisal) logger.info("部门经理绩效考核结果: " + departmentManagerAppraisal);
if (hrApproverAppraisal) logger.info("HR审批人绩效考核结果: " + hrApproverAppraisal);
if (hrManagerAppraisal) logger.info("HR经理绩效考核结果: " + hrManagerAppraisal);
if (generalManagerAppraisal) logger.info("总经理绩效考核结果: " + generalManagerAppraisal);

// 构建结果对象，以角色为key组织数据
def result = [
  [
    "employee": employeeAppraisal ? employeeAppraisal[0] : null,
    "departmentLeader": departmentLeaderAppraisal? departmentLeaderAppraisal[0] : null,
    "departmentManager": departmentManagerAppraisal? departmentManagerAppraisal[0] : null,
    "hrApprover": hrApproverAppraisal? hrApproverAppraisal[0] : null,
    "hrManager": hrManagerAppraisal? hrManagerAppraisal[0] : null,
    "generalManager": generalManagerAppraisal? generalManagerAppraisal[0] : null
	]
]

// ✅ 最终返回：以角色为key的对象
return result;