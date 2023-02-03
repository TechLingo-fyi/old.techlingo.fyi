// import Astro from '@astro/astro-jsx'
// const jsons = await Astro.glob('../../lingos/*.json')

interface Lingo {
  id: string;
  term: string;
}

interface Lingos {
  lingos: Lingo[];
}

const Lingos = ({ lingos }: Lingos) => {
  // Group by first letter of the id property
  const groupedLingos = lingos.reduce((acc, lingo) => {
    const firstLetter = lingo.id[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(lingo);
    return acc;
  }, {} as Record<string, Lingo[]>);

  return (
    <div className="relative flex min-h-screen flex-col justify-center py-6 sm:py-12">
      <div className="columns-1 2xl:columns-4 xl:columns-3 gap-10  box-border mx-auto before:box-inherit after:box-inherit">
        {Object.entries(groupedLingos).map(([letter, lingos]) => (
          <div className="break-inside-avoid p-8 mb-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h2 className="text-2xl font-bold">{letter}</h2>
            {lingos.map((lingo) => (
              <p>
                <a href={"/" + lingo.id}>{lingo.term}</a>
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lingos;
