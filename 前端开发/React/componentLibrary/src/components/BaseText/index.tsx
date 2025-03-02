import React from 'react';
import { Typography } from 'antd';
import { BaseTextProps } from './types';

const { Text } = Typography;

function BaseText({ children, type }: BaseTextProps): React.JSX.Element {
	return <Text type={type}>{children}</Text>;
}

export default BaseText;
