export interface BaseDemoProps {
	type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'; // 按钮类型
	size?: 'small' | 'middle' | 'large'; // 按钮尺寸
	disabled?: boolean; // 是否禁用
	onClick?: React.MouseEventHandler<HTMLElement>; // 点击事件回调
	children?: React.ReactNode;
	className?: string;
}
