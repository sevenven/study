import React from 'react';
import { Space } from 'antd';
import BaseText from '../index';

const Demo: React.FC = () => {
	return (
		<Space direction="vertical" size={16}>
			<Space>
				<BaseText>默认文本</BaseText>
				<BaseText type="secondary">次要文本</BaseText>
				<BaseText type="success">成功文本</BaseText>
			</Space>

			<Space>
				<BaseText type="warning">警告文本</BaseText>
				<BaseText type="danger">危险文本</BaseText>
			</Space>
		</Space>
	);
};

export default Demo;
