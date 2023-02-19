import toast from "react-hot-toast";

const CopyButton = ({
  term,
  lang,
  size = 3,
}: {
  term: string;
  lang: string;
  size?: number;
}) => {
  const copyToClipBoard = async (event: any) => {
    console.log(event);

    const { term, lang } = event.currentTarget.dataset;
    const text =
      "https://techlingo.fyi/" + term + (lang !== undefined ? "#" + lang : "");
    try {
      await navigator.clipboard.writeText(text);
      toast("Link copied to clipboard!");
    } catch (err) {
      console.log(err);
    }
  };

  const svgClasses = `"w-${size} h-${size} p-0 stroke-current`;

  return (
    <button
      title="Copy link to clipboard"
      data-term={term}
      data-lang={lang}
      onClick={copyToClipBoard}
      className="text-xs text-gray-400 dark:text-gray-500 font-bold py-1 px-2 ml-2 rounded-full inline-flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={svgClasses}
      >
        <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    </button>
  );
};
export default CopyButton;
