
// 接收逗号分隔的uid字符串作为输入
def uidsString = ${__input__.uidsString}

// 分割字符串为uid列表
def uidList = []
if (uidsString && uidsString.trim()) {
    uidList = uidsString.split(',').collect { it.trim() }
    
    // 遍历每个uid并更新对应的员工记录
    uidList.each { uid ->
        // 为每个员工设置time=1（由于只有uid没有完整员工对象，这里直接设置为1）
        callService("app_9unuctuq7v", "t_employee_6k6cdenn_update", [
            "uid": uid, 
            "time": 1
        ])
    }
}
