SELECT
  e.uid,
  e.final_evaluation_status_code,
  e.sep_score,
  e.idp_score,
  e.final_score,
  e.plan_user_id,
  e.create_time,
  e.update_time,
  e.creator,
  e.process_status,
  e.sys_update_user,
  e.sys_audit_user,
  e.sys_audit_time,
  e.sys_deleted,
  p.plan_user_name,
  p.post,
  p.mentor_id,
  p.coach_id
FROM t_final_evaluation_l76l0srb e
LEFT JOIN t_final_plan_1cwu93rl p ON e.sep_plan_id = p.uid AND p.sys_deleted = 0
WHERE e.sys_deleted = 0    