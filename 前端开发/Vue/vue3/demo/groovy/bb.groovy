def uids = ${__input__.uids};

// 处理多个UID的情况，将逗号分隔的字符串拆分为列表
List<String> uidList = uids?.split(",")?.toList() ?: []
logger.info("处理的UID列表: " + uidList)

// 初始化结果数组
def resultArray = []

// 遍历每个UID进行处理
uidList.each { String singleUid ->
	try {
		// 查询季度绩效考核填报信息
		def mainQueryMap = ["uid": singleUid];
		def performanceAppraisalResult = callService("app_ur37s40i50", "t_performance_appraisal_selectOne", mainQueryMap)
		logger.info("performanceAppraisalResult for " + singleUid + ": " + performanceAppraisalResult)
		
		// 只有当主查询结果不为空时，才继续查询关联信息
		if (performanceAppraisalResult && performanceAppraisalResult.uid) {
			// 查询季度绩效考核填报关联的主考核项信息
			def performanceMainItemsResult = callService("app_ur37s40i50", "t_fill_main_item_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"t_performance_appraisal_id\",\"value\":[\""+performanceAppraisalResult.uid+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}");
			// 查询季度绩效考核填报关联的辅助考核项信息
			def performanceSupportItemsResult = callService("app_ur37s40i50", "t_fill_support_item_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"t_performance_appraisal_id\",\"value\":[\""+performanceAppraisalResult.uid+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}");
			// 查询季度绩效考核填报关联的一票否决项信息
			def performanceVetoItemsResult = callService("app_ur37s40i50", "t_fill_veto_item_selectMore", "{\"page_index\":1,\"page_size\":1000,\"sort_criteria\":{\"create_time\":\"DESC\"},\"query_criteria\":[{\"column_name_list\":null,\"column_name\":\"t_performance_appraisal_id\",\"value\":[\""+performanceAppraisalResult.uid+"\"],\"query_type\":0}],\"filter_sql\":null,\"data_filters\":[],\"permission_filters\":[]}");
			
			// 添加日志
			logger.info("performanceMainItemsResult for " + singleUid + ": " + performanceMainItemsResult)
			logger.info("performanceSupportItemsResult for " + singleUid + ": " + performanceSupportItemsResult)
			logger.info("performanceVetoItemsResult for " + singleUid + ": " + performanceVetoItemsResult)
			
			// 数据组装
			performanceAppraisalResult.performanceMainItems = performanceMainItemsResult
			performanceAppraisalResult.performanceSupportItems = performanceSupportItemsResult
			performanceAppraisalResult.performanceVetoItems = performanceVetoItemsResult
			
			// 添加到结果数组
			resultArray.add(performanceAppraisalResult)
		} else {
			logger.warn("未找到UID " + singleUid + " 对应的绩效考核信息")
		}
	} catch (Exception e) {
		logger.error("处理UID " + singleUid + " 时发生错误: " + e.getMessage())
	}
}

// ✅ 最终返回：数组，里面包含多个对象（每个UID对应一个）
return resultArray