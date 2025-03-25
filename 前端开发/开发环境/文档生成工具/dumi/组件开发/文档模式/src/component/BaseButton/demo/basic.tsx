import React from 'react';
import { Space } from 'antd';
import BaseButton from '../index';

const Demo: React.FC = () => {
	return (
		<Space direction="vertical" size={16}>
			<Space>
				<BaseButton type="primary">主按钮</BaseButton>
				<BaseButton>默认按钮</BaseButton>
				<BaseButton type="dashed">虚线按钮</BaseButton>
				<BaseButton type="text">文本按钮</BaseButton>
				<BaseButton type="link">链接按钮</BaseButton>
			</Space>

			<Space>
				<BaseButton type="primary" size="large">
					大号按钮
				</BaseButton>
				<BaseButton type="primary">中号按钮</BaseButton>
				<BaseButton type="primary" size="small">
					小号按钮
				</BaseButton>
			</Space>

			<Space>
				<BaseButton type="primary" loading>
					加载中
				</BaseButton>
				<BaseButton type="primary" shape="circle" icon={<span>↻</span>} />
				<BaseButton type="primary" disabled>
					禁用按钮
				</BaseButton>
			</Space>
		</Space>
	);
};

export default Demo;
