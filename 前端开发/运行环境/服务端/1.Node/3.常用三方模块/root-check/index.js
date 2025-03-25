import rootCheck from 'root-check';

// 检查是否以 root 用户运行
rootCheck('请勿使用 root 权限运行此命令！\n建议使用普通用户身份运行:\n   node check-root.js');
console.log('The script is not running as root.');
