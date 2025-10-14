

/**
 * 筛选出性别为female的员工数据
 * @return 符合条件的员工列表
 */
def filterFemaleEmployees() {
    // 获取员工列表数据
    def employeeListData = callService("app_9unuctuq7v", "t_employee_6k6cdenn_selectMore", 
        "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}");
    
    // 筛选出性别为female的员工
    def femaleEmployees = []
    if (employeeListData && employeeListData instanceof List) {
        femaleEmployees = employeeListData.findAll { employee -> 
            employee?.gender == "female" 
        }
    }
    
    return femaleEmployees
}

/**
 * 根据员工列表更新time字段
 * @param employees 员工列表数据
 * @return 更新结果列表
 */
def updateEmployeeTimeField(List employees) {
    // 创建一个集合存储更新结果
    def updateResults = []
    
    if (employees && employees.size() > 0) {
        employees.each { employee ->
            // 计算新的time值，如果time为空则赋值为1，否则time+1
            def newTime = (employee.time == null || employee.time == "") ? 1 : (employee.time as Integer) + 1
            
            // 更新员工记录
            def updateResult = callService("app_9unuctuq7v", "t_employee_6k6cdenn_update", [
                "uid": employee.uid, 
                "time": newTime
            ])
            
            // 存储更新结果
            updateResults << [uid: employee.uid, newTime: newTime, result: updateResult]
        }
    }
    
    return updateResults
}

// 主流程：先筛选数据，再更新数据
def femaleEmployees = filterFemaleEmployees()
def updateResults = updateEmployeeTimeField(femaleEmployees)

// 返回更新结果（如果需要）
// return [updateResults: updateResults, femaleEmployeeCount: femaleEmployees.size()]