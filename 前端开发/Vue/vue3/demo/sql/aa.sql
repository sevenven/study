SELECT 
  d.department_id,
  d.department_name,
  COUNT(edr.employee_id) AS employee_count
FROM 
  v_dept_info d
LEFT JOIN 
  v_employee_dept_relation edr 
  ON d.department_id = edr.dept_id 
  AND edr.main_dept_flag = 1
WHERE 
  d.department_id = #{department_id}
GROUP BY 
  d.department_id, d.department_name 