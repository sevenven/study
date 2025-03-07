import React from 'react';
import { render, screen } from '@testing-library/react';
import BaseText from '../index';

describe('BaseText Component', () => {
	test('renders text content correctly', () => {
		render(<BaseText>测试文本</BaseText>);
		expect(screen.getByText('测试文本')).toBeInTheDocument();
	});

	test('renders with different types', () => {
		const { rerender } = render(<BaseText type="secondary">次要文本</BaseText>);
		expect(screen.getByText('次要文本')).toBeInTheDocument();

		rerender(<BaseText type="success">成功文本</BaseText>);
		expect(screen.getByText('成功文本')).toBeInTheDocument();

		rerender(<BaseText type="warning">警告文本</BaseText>);
		expect(screen.getByText('警告文本')).toBeInTheDocument();

		rerender(<BaseText type="danger">危险文本</BaseText>);
		expect(screen.getByText('危险文本')).toBeInTheDocument();
	});
});
