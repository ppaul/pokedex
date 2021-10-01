// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
/** @jsxRuntime classic */
import { css } from "@emotion/react";

export const pageStyle = css`
  color: white;
  text-align: center;
`;
