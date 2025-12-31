import groovy.json.JsonOutput

def organizations = ${__input__.organizations}

// 优化日志输出，只记录已定义的变量，保留字符串拼接方式
logger.info("Groovy版本: " + GroovySystem.version + " organizations (count): " + (organizations != null ? organizations.size() : 'null'));

def calendar = Calendar.getInstance()
def year = calendar.get(Calendar.YEAR)
def month = calendar.get(Calendar.MONTH) + 1
def day = calendar.get(Calendar.DAY_OF_MONTH)
def hour = calendar.get(Calendar.HOUR_OF_DAY)
def minute = calendar.get(Calendar.MINUTE)
def currentTime = String.format("%04d-%02d-%02d %02d:%02d", year, month, day, hour, minute)

// 获取当前日期的 Calendar 对象，并清除时分秒
def todayCalendar = Calendar.getInstance()
todayCalendar.set(Calendar.HOUR_OF_DAY, 0)
todayCalendar.set(Calendar.MINUTE, 0)
todayCalendar.set(Calendar.SECOND, 0)
todayCalendar.set(Calendar.MILLISECOND, 0)

// 遍历 organizations 数组 判断其 next_election_date 是否距离今天差120天或者60天
if (organizations != null) {
  for (organization in organizations) {
    
    if (organization?.next_election_date) {
      // 创建一个 Calendar 实例表示选举日期
      def electionCalendar = Calendar.getInstance()
      electionCalendar.setTimeInMillis(organization.next_election_date.toLong())
      electionCalendar.set(Calendar.HOUR_OF_DAY, 0)
      electionCalendar.set(Calendar.MINUTE, 0)
      electionCalendar.set(Calendar.SECOND, 0)
      electionCalendar.set(Calendar.MILLISECOND, 0)

      long diffInMillis = electionCalendar.getTimeInMillis() - todayCalendar.getTimeInMillis()
      long diffInDays = diffInMillis / (1000 * 60 * 60 * 24)

      logger.info("处理组织: " + organization?.org_full_name + ", next_election_date (timestamp): " + organization?.next_election_date + ", 距离今天: " + diffInDays + " 天")

      if (diffInDays == 120 || diffInDays == 60) {
        logger.info("组织 " + organization.org_full_name + " 满足发送条件 (差值 " + diffInDays + " 天)，准备发送通知。")
        callService("app_mgt503l5m8", "notify_dofDSlb8", [
          msg_type: "text",
          content:"【党组织-换选届提醒】\n" + "通知主题：" + organization.org_full_name + "换选届提醒\n提醒内容：请完成" + organization.org_full_name + "组织换选，并在钉钉\"工作台-全部应用-业务系统-智改数转-党组织管理-换选届管理\"中更新换选届信息\n提醒时间：" + currentTime,
          userid_list: {
            def idList = []
            if (organization.org_leader) idList.add(organization.org_leader)
            if (organization.org_admin_id) idList.addAll(organization.org_admin_id.split('#@#'))
            return idList.unique().join(',')
          }(),
          dept_id_list: ""
        ])
      } else {
        logger.info("组织 " + organization.org_full_name + " 不满足发送条件 (差值 " + diffInDays + " 天)。")
      }
    } else {
      logger.warn("组织 " + organization?.org_full_name + " 的 next_election_date 为空，跳过处理。")
    }
  }
} else {
  logger.info("organizations为null，无需遍历")
}