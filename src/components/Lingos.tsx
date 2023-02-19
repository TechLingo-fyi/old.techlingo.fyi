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
  "p-8",
  "mb-6",
  "max-w-sm",
  "bg-white",
  "border",
  "border-gray-200",
  "rounded-lg",
  "shadow",
  "hover:bg-gray-100",
  "dark:bg-dark1",
  "dark:border-gray-700",
  "dark:hover:bg-gray-700",
];
const headLetterStyle = [
  "text-2xl",
  "font-bold",
  "text-gray-900",
  "dark:text-textLight0",
];

const linkStyle = [
  "text-gray-900",
  "dark:text-textLight0",
  "hover:text-gray-900",
  "dark:hover:text-textLight0",
];

const Card = ({ lingos, letter }: { lingos: Lingo[]; letter: string }) => (
  <div className={cardStyle.join(" ")}>
    <h2 className={headLetterStyle.join(" ")}>{letter}</h2>
    {lingos.map((lingo) => {
      const identifier = slugify(lingo.term, { lower: true });
      return (
        <p className={linkStyle.join(" ")}>
          <a href={"/" + identifier}>{lingo.term}</a>
        </p>
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

  const mainCardContainerStyle = [
    "relative",
    "flex",
    "min-h-screen",
    "flex-col",
    "justify-center",
    "py-6",
    "sm:py-12",
  ];

  const columnStyle = [
    "columns-1",
    "2xl:columns-4",
    "xl:columns-3",
    "gap-10",
    "",
    "box-border",
    "mx-auto",
    "before:box-inherit",
    "after:box-inherit",
  ];

  return (
    <div className={mainCardContainerStyle.join(" ")}>
      <div className={columnStyle.join(" ")}>
        {Object.entries(groupedLingos).map(([letter, lingos]) => (
          <Card letter={letter} lingos={lingos} />
        ))}
      </div>
    </div>
  );
};

export default Lingos;
