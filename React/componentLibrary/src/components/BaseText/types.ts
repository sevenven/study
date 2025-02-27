import React from "react";

export interface BaseTextProps {
  type?: "secondary" | "success" | "warning" | "danger";
  children: React.ReactNode;
}
