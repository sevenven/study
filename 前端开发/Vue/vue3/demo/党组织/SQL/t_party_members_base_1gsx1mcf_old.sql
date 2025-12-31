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
  po.branch_id AS branch_id, -- 明确指定别名
  po.committee_id AS committee_id, -- 明确指定别名
  po.org_full_name,
  po.org_leader,
  mei.graduate_school, 
  mei.major
FROM t_party_members_base_np3jz6v4 pmb
INNER JOIN t_member_transfer_history_66g3i3yc mth 
  ON pmb.uid = mth.t_party_members_base_id
  AND mth.sys_deleted = 0
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