// Auto-generated file created by svgr-cli source svg-template.js
// Run yarn icons:create to update
// Do not edit
import * as React from "react";
import type { SVGProps } from "react";
interface Props extends SVGProps<any> {
  primarycolor?: string;
  secondarycolor?: string;
}
const SvgCalendar = ({ primarycolor, secondarycolor, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill={secondarycolor || "none"}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={primarycolor || "#1A1A1A"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5"
    />
    <path
      stroke={primarycolor || "#1A1A1A"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.695 13.7h.009M15.695 16.7h.009M11.996 13.7h.008M11.996 16.7h.008M8.294 13.7h.01M8.294 16.7h.01"
    />
  </svg>
);
export default SvgCalendar;