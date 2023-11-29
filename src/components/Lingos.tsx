import slugify from "slugify";
import type { ReactNode } from "react";

import type { Lingo } from "../entities/Lingo";
import { hoverBackground } from "../styles";
import { Accordion } from "./common";

interface Lingos {
  lingos: Lingo[];
}

const linkStyle = hoverBackground.concat([
  "pl-7",
  "p-3",
  "text-xl",
  "border-b",
  "dark:border-gray-600",
]);

const headerLetterStyle = [
  "p-3",
  "text-xl",
  "font-bold",
  "text-gray-900",
  "overflow-hidden",
  "border-none",
  "dark:text-textLight0",
];

const columnStyle = [
  "columns-1",
  "gap-0",
  "box-border",
  "w-2/3",
  "mx-auto",
  "before:box-inherit",
  "after:box-inherit",
];

const Lingos = ({ lingos }: Lingos) => {
  // Group by first letter of the id property
  const groupedLingos = lingos.reduce((acc, lingo) => {
    const identifier = slugify(lingo.display_name, { lower: true });
    const firstLetter = identifier[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(lingo);
    return acc;
  }, {} as Record<string, Lingo[]>);

  // Build the table
  const table: ReactNode[] = [];
  for (const [letter, lingos] of Object.entries(groupedLingos)) {
    const accordionContent: ReactNode[] = [];
    for (const lingo of lingos) {
      accordionContent.push(
        <a  href={"/" + lingo.slug} key={lingo.display_name}>
          <div className={linkStyle.join(" ")}>
            {lingo.display_name}
          </div>
        </a>
      );
    }
    table.push(
      <Accordion
        key={letter}
        isOpenDefault={table.length === 0}
        header={
          <div className={headerLetterStyle.join(" ")}>
            {letter}
          </div>
        }
      >{accordionContent}</Accordion>
    )
  }

  return (
    <div className={columnStyle.join(" ")}>
      {table}
    </div>
  );
};

export default Lingos;