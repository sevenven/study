SELECT
  pmb.uid,
  pmb.name,
  pmb.id_card,
  pmb.gender,
  pmb.nation,
  pmb.native_place,
  pmb.birth_date,
  pmb.phone,
  pmb.family_address,
  pmb.highest_education_code,
  pmb.highest_degree_code,
  pmb.has_overseas_experience,
  pmb.work_start_date,
  pmb.department,
  pmb.job_position,
  pmb.technical_title,
  pmb.join_date,
  pmb.full_member_date,
  pmb.political_status_code,
  pmb.create_time,
  pmb.update_time,
  pmb.creator,
  pmb.process_status,
  pmb.sys_update_user,
  pmb.sys_audit_user,
  pmb.sys_audit_time,
  pmb.sys_deleted,
  mth.uid AS uid_mth,
  mth.cell_id,
  mth.from_cell_id,
  mth.is_current,
  mth.party_member_source_code,
  mth.is_party_worker,
  mth.cell_party_position_code,
  mth.branch_party_position_code,
  mth.committee_party_position_code,
  mth.committee_position_weight,
  mth.branch_position_weight,
  mth.cell_position_weight,
  mth.transfer_date,
  mth.process_instance_id AS process_instance_id_mth, 
  mth.create_time AS create_time_mth,
  mth.update_time AS update_time_mth,
  prev_mth.cell_id AS cell_id_prev,
  next_mth.cell_id AS cell_id_next,
  next_mth.transfer_date AS transfer_date_next,
  next_mth.party_member_source_code AS party_member_source_code_next,
  po.uid AS uid_po,
  po.branch_id AS branch_id,
  po.committee_id AS committee_id,
  po.org_full_name,
  po.org_leader,
  mei.graduate_school, 
  mei.major
FROM t_party_members_base_np3jz6v4 pmb
-- 核心修改：先找出每个党员最新的那条目标转移记录，再进行连接
INNER JOIN (
    -- 此子查询为每个党员找出其符合条件的最新一条转移记录ID
    SELECT 
        t_party_members_base_id,
        MAX(uid) AS latest_uid -- 假设uid或transfer_date越大记录越新
        -- 如果不能用uid判断时间，请使用: MAX(transfer_date) AS latest_transfer_date
    FROM t_member_transfer_history_66g3i3yc
    WHERE sys_deleted = 0
      -- 这里放入你的动态条件，例如：
      -- AND cell_id = '某个ID'
      -- AND is_current = 0
    GROUP BY t_party_members_base_id -- 确保每个党员只取一条
) latest_mth ON pmb.uid = latest_mth.t_party_members_base_id
-- 用上面找到的最新记录ID，连接回原表获取该记录的完整信息
INNER JOIN t_member_transfer_history_66g3i3yc mth 
  ON latest_mth.latest_uid = mth.uid 
  AND mth.sys_deleted = 0 -- 此条件在子查询已保证，可省略
-- 以下LEFT JOIN部分逻辑不变，但连接条件改为基于我们确定的最新记录 mth.uid
LEFT JOIN t_member_transfer_history_66g3i3yc prev_mth
  ON prev_mth.uid = mth.prev_record_id 
  AND prev_mth.sys_deleted = 0
LEFT JOIN t_member_transfer_history_66g3i3yc next_mth
  ON next_mth.prev_record_id = mth.uid 
  AND next_mth.sys_deleted = 0
LEFT JOIN t_party_organizations_a7f6yk9k po 
  ON mth.cell_id = po.uid 
  AND po.sys_deleted = 0
LEFT JOIN t_member_education_info_dtgka1we mei 
  ON pmb.uid = mei.t_party_members_base_id
  AND mei.sys_deleted = 0 
  AND mei.is_highest_education = '1' 
WHERE
  pmb.sys_deleted = 0
-- 你可以在这里添加对pmb或其他表的其他筛选条件
-- 但针对mth的动态筛选条件，必须放在上面的子查询中