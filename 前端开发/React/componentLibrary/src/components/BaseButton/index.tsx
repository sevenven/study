import React, { JSX } from 'react';
import { Button } from 'antd';
import { BaseButtonProps } from './type';
import './index.less';

function BaseButton({ className, style, children, ...restProps }: BaseButtonProps): JSX.Element {
  return (
    <Button className={className} style={style} {...restProps}>
      {children}
    </Button>
  );
}

export default BaseButton;
export type { BaseButtonProps };
