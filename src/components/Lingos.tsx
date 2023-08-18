import slugify from "slugify";

interface Lingo {
  id: string;
  term: string;
}

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

const Card = ({ lingos, letter }: { lingos: Lingo[]; letter: string }) => (
  <div className={cardStyle.join(" ")}>
    <div className={headerLetterStyle.join(" ")}>{letter}</div>
    {lingos.map((lingo) => {
      const identifier = slugify(lingo.term, { lower: true });
      return (
        <a  href={"/" + identifier}>
        <div className={linkStyle.join(" ")}>
          {lingo.term}
        </div>
        </a>
      );
    })}
  </div>
);
const Lingos = ({ lingos }: Lingos) => {
  // Group by first letter of the id property
  const groupedLingos = lingos.reduce((acc, lingo) => {
    const identifier = slugify(lingo.term, { lower: true });
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

  return (
      <div className={columnStyle.join(" ")}>
        {Object.entries(groupedLingos).map(([letter, lingos]) => (
          <Card key={letter} letter={letter} lingos={lingos} />
        ))}
      </div>
  );
};

export default Lingos;
