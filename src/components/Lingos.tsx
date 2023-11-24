import slugify from "slugify";
import type { ReactNode } from "react";

import type { Lingo } from "../entities/Lingo";
import { Accordion } from "./common";

interface Lingos {
  lingos: Lingo[];
}

const linkStyle = [
  "p-3",
  "text-xl",
  "dark:text-textLight0",
  "hover:bg-gray-200",
  "dark:hover:text-textLight0",
  "dark:hover:bg-gray-700",
  "[&:last-child]:border-b [&:last-child]:border-gray-600",
  "[&:not(:last-child)]:border-b [&:not(:last-child)]:border-gray-900",
];

const headerLetterStyle = linkStyle.concat([
  "font-bold",
  "text-gray-900",
  "overflow-hidden",
  "dark:text-textLight0",
  "border-none",
]);

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