// Auto-generated file created by svgr-cli source svg-template.js
// Run yarn icons:create to update
// Do not edit
import * as React from "react";
import type { SVGProps } from "react";
interface Props extends SVGProps<any> {
  primarycolor?: string;
  secondarycolor?: string;
}
const SvgInfoCircle = ({ primarycolor, secondarycolor, ...props }: Props) => (
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
      strokeWidth={1.5}
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10M12 8v5"
    />
    <path
      stroke={primarycolor || "#1A1A1A"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.995 16h.009"
    />
  </svg>
);
export default SvgInfoCircle;
