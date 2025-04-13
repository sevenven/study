// 初始化项目的函数
const initProject = async (projectName, commandOptions) => {
	console.log('init', projectName, commandOptions, process.env.CLI_TARGET_PATH);
};

module.exports = {
	initProject
};
