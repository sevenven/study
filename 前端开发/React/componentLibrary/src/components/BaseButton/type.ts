import type { ButtonProps } from "antd";
import type { CSSProperties } from "react";

export interface BaseButtonProps extends Omit<ButtonProps, "className" | "style"> {
  className?: string;
  style?: CSSProperties;
}
