import groovy.json.JsonOutput

def partyOrganizationId = ${__input__.partyOrganizationId}
def lastElectionDate = ${__input__.lastElectionDate}
def nextElectionDate = ${__input__.nextElectionDate}
def uid = ${__input__.uid}

logger.info("Groovy版本: " + GroovySystem.version + ", partyOrganizationId: " + partyOrganizationId + ", lastElectionDate: " + lastElectionDate + ", nextElectionDate: " + nextElectionDate + ", uid: " + uid)

// 构建查询条件
def queryCriteria = [
  [
    "column_name_list": null,
    "column_name": "party_organizations_id",
    "value": [partyOrganizationId],
    "query_type": 0
  ]
]

// 当uid参数存在时，添加uid查询条件
if (uid) {
  queryCriteria.add([
    "column_name_list": null,
    "column_name": "uid",
    "value": [uid],
    "query_type": 11
  ])
}

def result = callService("app_mgt503l5m8", "t_election_records_zn2e5kuu_selectMore", JsonOutput.toJson([
	"page_index": 1,
	"page_size": 100,
	"query_criteria": queryCriteria
]))

// 定义重叠检查结果 - 将overlappingRecord修改为数组
def checkResult = [
  isOverlap: false,
  overlappingRecords: []
]

// 检查是否存在重叠的选举记录
for (record in result) {
  // 获取记录中的选举日期范围，确保转换为long类型并处理空值
  Long recordLastElectionDate = record.last_election_date?.toLong()
  Long recordNextElectionDate = record.next_election_date?.toLong()
  
  // 确保输入日期也是long类型
  long inputLastElectionDate = lastElectionDate.toLong()
  long inputNextElectionDate = nextElectionDate.toLong()
  
  // 检查日期范围是否重叠（修复后的逻辑）
  boolean isOverlap = !(inputNextElectionDate <= recordLastElectionDate || inputLastElectionDate >= recordNextElectionDate)
  
  if (isOverlap) {
    checkResult.isOverlap = true
    checkResult.overlappingRecords.add(record) // 添加重叠记录到数组
    logger.info("发现重叠记录: " + record)
    // 移除break语句，继续检查其他可能的重叠记录
  }
}

// 返回检查结果
return checkResult