import slugify from "slugify";

interface Lingos {
  lingos: Lingo[];
}

const cardStyle = [
  "break-inside-avoid",
  "bg-white",
  "border-gray-200",
  "dark:bg-dark0",
  "dark:border-gray-700",
];

const linkStyle = [
  "p-3",
  "text-xl",
  "dark:text-textLight0",
  "hover:bg-gray-200",
  "dark:hover:text-textLight0",
  "dark:hover:bg-gray-700",
  "[&:last-child]:border-b [&:last-child]:border-gray-200",
  "[&:not(:last-child)]:border-b [&:not(:last-child)]:border-gray-900",
];

const headerLetterStyle = linkStyle.concat([
  "font-bold",
  "text-gray-900",
  "overflow-hidden",
  "dark:text-textLight0",
]);

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

  const columnStyle = [
    "columns-1",
    "2xl:columns-4",
    "xl:columns-3",
    "gap-0",
    "box-border",
    "w-2/3",
    "mx-auto",
    "before:box-inherit",
    "after:box-inherit",
  ];

  const array = [];
  for (const [letter, lingos] of Object.entries(groupedLingos)) {
    array.push(<div className={headerLetterStyle.join(" ")}>{letter}</div>);
    for (const lingo of lingos) {
      array.push(<a  href={"/" + lingo.slug}>
        <div className={linkStyle.join(" ")}>
          {lingo.display_name}
        </div>
        </a>
      );
    }
  }

  return (
      <div className={columnStyle.join(" ") + " border"}>
        {array}
      </div>
  );
};

export default Lingos;
