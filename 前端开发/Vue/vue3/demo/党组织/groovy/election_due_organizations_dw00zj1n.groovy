import groovy.json.JsonOutput

// 优化日志输出，只记录已定义的变量，保留字符串拼接方式
logger.info("Groovy版本: " + GroovySystem.version)

def organizations = callService("app_mgt503l5m8", "election_due_organizations_s38rcpav", JsonOutput.toJson([
  "page_index": 1,
  "page_size": 1000,
  "query_criteria": []
]))

logger.info("获取到的组织: " + organizations)

return [organizations: organizations];