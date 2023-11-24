import { useState } from "react";
import type { ReactNode } from "react";

import { ChevronDown, ChevronUp } from "../icons";

export type AccordionProps = {
  children: ReactNode;
  header: ReactNode;
  isOpenDefault?: boolean;
}

const containerStyle = [
  "my-3",
];

const headerStyle = [
  "relative",
  "dark:text-textLight0",
  "border-b",
  "border-gray-500",
];

const buttonStyle = [
  "w-full",
  "text-left",
  "pl-4"
];

const arrowStyle = [
  "absolute",
  "top-4"
];
export const Accordion = ({
  children,
  header,
  isOpenDefault = true,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenDefault);

  return (
    <div className={containerStyle.join(" ")}>
      <div className={headerStyle.join(" ")}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={buttonStyle.join(" ")}
        >
          <div>
            {header}
          </div>
        </button>
        <div className={arrowStyle.join(" ")}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
