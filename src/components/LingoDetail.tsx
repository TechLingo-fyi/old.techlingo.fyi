import CopyButton from "./CopyButton";
import LingoDefinitions from "./LingoDefinitions";

const cardStyle = [
  "max-w-3xl",
  "min-w-3xl",
  "xl:min-w-3xl",
  "p-8",
  "pb-5",
  "bg-white",
  "border",
  "border-gray-200",
  "rounded-lg",
  "shadow",
  "dark:bg-dark1",
  "dark:border-gray-700",
];

const termStyle = [
  "mb-2",
  "text-5xl",
  "font-bold",
  "tracking-tight",
  "text-gray-900",
  "dark:text-white",
];

const bottomLinkStyle = [
  "hover:underline",
  "mx-2",
  "cursor-pointer",
  "font-bold",
  "text-gray-500",
  "dark:text-gray-500",
];

const LingoDetail = ({
  data, language, slug,
  shareableText
}: { data: any, language: string, slug: string, shareableText:string }) => {
  return (
    <div className={cardStyle.join(" ")}>
      <h3 className={termStyle.join(" ")}>
        {data.display_name}
      </h3>

      <LingoDefinitions data={data} language={language} />

      <div className="flex justify-end mt-2 text-xs">
        <CopyButton className={bottomLinkStyle.join(" ")} slug={slug} lang={language} />
        <a className={bottomLinkStyle.join(" ")} target="_blank" href={`https://twitter.com/intent/tweet?text=${shareableText}`}>Share on Twitter</a>
        <a className={bottomLinkStyle.join(" ")}  href={`https://github.com/TechLingo-fyi/techlingo.fyi/blob/main/lingos/${slug}.json`} >Suggest changes</a>
      </div>
    </div>
  );
};

export default LingoDetail;
