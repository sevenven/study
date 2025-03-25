import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BaseButton from './index';

const meta: Meta<typeof BaseButton> = {
	title: 'Components/BaseButton',
	component: BaseButton,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

// 基础示例
function BasicExample() {
	return (
		<div style={{ display: 'flex', gap: '8px' }}>
			<BaseButton type="primary">主按钮</BaseButton>
			<BaseButton>次按钮</BaseButton>
			<BaseButton type="dashed">虚线按钮</BaseButton>
			<BaseButton type="link">链接按钮</BaseButton>
			<BaseButton type="text">文本按钮</BaseButton>
		</div>
	);
}

export const Basic: Story = {
	render: () => <BasicExample />
};

// 危险按钮
function DangerExample() {
	return (
		<div style={{ display: 'flex', gap: '8px' }}>
			<BaseButton type="primary" danger>
				危险主按钮
			</BaseButton>
			<BaseButton danger>危险次按钮</BaseButton>
			<BaseButton type="dashed" danger>
				危险虚线按钮
			</BaseButton>
			<BaseButton type="link" danger>
				危险链接按钮
			</BaseButton>
			<BaseButton type="text" danger>
				危险文本按钮
			</BaseButton>
		</div>
	);
}

export const Danger: Story = {
	render: () => <DangerExample />
};
