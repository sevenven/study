import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; // 导入测试工具
import '@testing-library/jest-dom'; // 扩展 Jest 的 DOM 断言
import BaseButton from '../index'; // 导入要测试的组件

// 使用 describe 定义测试套件
describe('BaseButton Component', () => {
	// 测试默认渲染行为
	test('renders with default props', () => {
		render(<BaseButton>Click me</BaseButton>); // 渲染组件
		const button = screen.getByText('Click me'); // 获取按钮元素

		// 断言按钮存在且具有默认样式类
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('btn', 'btn-default', 'btn-middle');
		expect(button).not.toHaveClass('btn-disabled'); // 验证非禁用状态
		expect(button).not.toBeDisabled(); // 验证按钮未禁用
	});

	// 测试不同类型按钮的渲染
	test('renders with different types', () => {
		const { rerender } = render(<BaseButton type="primary">Primary</BaseButton>);
		expect(screen.getByText('Primary')).toHaveClass('btn-primary'); // 验证 primary 类型

		rerender(<BaseButton type="dashed">Dashed</BaseButton>); // 重新渲染组件
		expect(screen.getByText('Dashed')).toHaveClass('btn-dashed'); // 验证 dashed 类型
	});

	// 测试不同尺寸按钮的渲染
	test('renders with different sizes', () => {
		const { rerender } = render(<BaseButton size="small">Small</BaseButton>);
		expect(screen.getByText('Small')).toHaveClass('btn-small'); // 验证 small 尺寸

		rerender(<BaseButton size="large">Large</BaseButton>); // 重新渲染组件
		expect(screen.getByText('Large')).toHaveClass('btn-large'); // 验证 large 尺寸
	});

	// 测试禁用状态的渲染和行为
	test('renders in disabled state', () => {
		render(<BaseButton disabled>Disabled</BaseButton>);
		const button = screen.getByText('Disabled');

		// 验证禁用状态的样式和行为
		expect(button).toHaveClass('btn-disabled');
		expect(button).toBeDisabled(); // 验证按钮是否禁用
	});

	// 测试点击事件的处理
	test('handles click events', () => {
		const handleClick = jest.fn(); // 创建模拟函数
		render(<BaseButton onClick={handleClick}>Click me</BaseButton>);

		fireEvent.click(screen.getByText('Click me')); // 触发点击事件
		expect(handleClick).toHaveBeenCalledTimes(1); // 验证点击事件被调用一次
	});

	// 测试禁用状态下点击事件是否被阻止
	test('does not trigger click event when disabled', () => {
		const handleClick = jest.fn();
		render(
			<BaseButton disabled onClick={handleClick}>
				Click me
			</BaseButton>
		);

		fireEvent.click(screen.getByText('Click me')); // 触发点击事件
		expect(handleClick).not.toHaveBeenCalled(); // 验证点击事件未被调用
	});

	// 测试自定义 className 的传递
	test('accepts custom className', () => {
		render(<BaseButton className="custom-class">Custom</BaseButton>);
		expect(screen.getByText('Custom')).toHaveClass('custom-class'); // 验证自定义类名
	});
});
// // 元素存在性测试
// expect(element).toBeInTheDocument();
// // 文本内容测试
// expect(element).toHaveTextContent('some text');
// // 样式测试
// expect(element).toHaveStyle({ color: 'red' });
// // 类名测试
// expect(element).toHaveClass('btn-primary');
// // 事件测试
// expect(handleClick).toHaveBeenCalled();
