import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BaseText from './index';

export default {
	title: 'Components/BaseText',
	component: BaseText,
	parameters: {
		docs: {
			description: {
				component: '基础文本组件，支持不同类型的文本展示'
			}
		}
	}
} as ComponentMeta<typeof BaseText>;

const Template: ComponentStory<typeof BaseText> = args => <BaseText {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {
	type: 'secondary',
	children: '次要文本'
};

export const Success = Template.bind({});
Success.args = {
	type: 'success',
	children: '成功文本'
};

export const Warning = Template.bind({});
Warning.args = {
	type: 'warning',
	children: '警告文本'
};

export const Danger = Template.bind({});
Danger.args = {
	type: 'danger',
	children: '危险文本'
};

export const Default = Template.bind({});
Default.args = {
	children: '默认文本'
};
