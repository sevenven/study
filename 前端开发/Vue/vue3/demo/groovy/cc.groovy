def employeeListData = callService("app_9unuctuq7v", "t_employee_6k6cdenn_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}");
    
// 筛选出性别为female的员工
def femaleEmployees = []
if (employeeListData && employeeListData instanceof List) {
	femaleEmployees = employeeListData.findAll { employee -> employee?.gender == "female" }
}

logger.info("女雇员列表: " + femaleEmployees);

return femaleEmployees