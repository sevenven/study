
def femaleEmployees = ${__input__.femaleEmployees}

femaleEmployees.each { employee ->
	// 计算新的time值，如果time为空则赋值为1，否则time+1
	def newTime = (employee.time == null || employee.time == "") ? 1 : (employee.time as Integer) + 1
	
	// 更新员工记录
	callService("app_9unuctuq7v", "t_employee_6k6cdenn_update", [
		"uid": employee.uid, 
		"time": newTime
	])
}
