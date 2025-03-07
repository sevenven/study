import React from 'react';
import classNames from 'classnames';
import { BaseDemoProps } from './types';
import './index.less';

const BaseDemo: React.FC<BaseDemoProps> = ({ type = 'default', size = 'middle', disabled = false, onClick, children, className }) => {
	const classes = classNames(
		'btn',
		`btn-${type}`,
		`btn-${size}`,
		{
			'btn-disabled': disabled
		},
		className
	);

	return (
		<button className={classes} disabled={disabled} onClick={onClick} type="button">
			{children}
		</button>
	);
};

export default BaseDemo;
