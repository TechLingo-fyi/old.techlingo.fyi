import CopyButton from "./CopyButton";
import LingoDefinitions from "./LingoDefinitions";

const outerDivStyle = [
  "flex",
  "items-start",
  "mt-9",
  "justify-center",
  "h-screen",
];

const cardStyle = [
  "max-w-3xl",
  "min-w-3xl",
  "xl:min-w-3xl",
  "p-8",
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

const LingoDetail = ({ data, language }: { data: any; language: string }) => {
  return (
    <div className={outerDivStyle.join(" ")}>
      <div className={cardStyle.join(" ")}>
        <h3 className={termStyle.join(" ")}>
          {data.term} <CopyButton term={data.term} lang={language} />
        </h3>

        <LingoDefinitions data={data} language={language} />
      </div>
    </div>
  );
};

export default LingoDetail;
