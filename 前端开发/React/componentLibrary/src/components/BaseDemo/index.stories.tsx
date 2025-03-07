import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BaseDemo from './index';

// 定义组件的 Storybook 元数据
export default {
	title: 'Components/BaseDemo', // 在 Storybook 侧边栏中显示的路径
	component: BaseDemo, // 关联的 React 组件
	argTypes: {
		// 定义组件属性的控制方式
		type: {
			options: ['primary', 'default', 'dashed', 'text', 'link'], // 可选值
			control: { type: 'select' } // 使用下拉选择器控件
		},
		size: {
			options: ['small', 'middle', 'large'], // 可选值
			control: { type: 'radio' } // 使用单选按钮控件
		},
		disabled: {
			control: 'boolean' // 使用开关控件
		},
		onClick: {
			action: 'clicked' // 捕获点击事件并在 Actions 面板显示
		}
	}
} as ComponentMeta<typeof BaseDemo>; // 使用类型断言确保类型安全

// 定义通用的故事模板
const Template: ComponentStory<typeof BaseDemo> = args => <BaseDemo {...args} />;

// 创建 Primary 按钮的故事
export const Primary = Template.bind({}); // 复制模板
Primary.args = {
	// 设置默认属性
	type: 'primary', // 按钮类型
	children: 'Primary Button' // 按钮文本
};

// 创建 Default 按钮的故事
export const Default = Template.bind({});
Default.args = {
	children: 'Default Button' // 使用默认类型
};

// 创建 Disabled 按钮的故事
export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true, // 禁用状态
	children: 'Disabled Button'
};
