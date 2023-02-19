import { Toaster } from "react-hot-toast";
import LangMap from "../data/Languages";

import slugify from "slugify";

const LanguageSpecificDefinition = ({
  language,
  definition,
  currentLanguage = false,
}: {
  language: string;
  definition: string;
  currentLanguage?: boolean;
}) => {
  let textSize = "text-md";
  let textColor = "text-gray-400";
  let hoverTextColor = "text-gray-500";

  // If the current page language is the
  // same as the definition language
  if (currentLanguage) {
    textSize = "text-2xl";
    textColor = "text-gray-900 dark:text-gray-200";
  }

  const definitionClasses = [
    textSize,
    textColor,
    "group-hover:text-gray-900",
    "group-hover:dark:text-gray-400",
  ];

  const dtClasses = [
    "mb-1",
    "text-gray-400",
    "md:text-lg",
    "group-hover:md:text-xl",
    "group-hover:text-gray-500",
    "group-hover:dark:text-gray-400",
  ];

  if (currentLanguage) {
    dtClasses.push("collapse hidden");
  }

  return (
    <div key={language} className="flex group flex-col pb-3 pt-3">
      <dt
        title={LangMap.get(language)?.englishLanguageName}
        className={dtClasses.join(" ")}
      >
        {LangMap.get(language)?.languageName}
        {/* <CopyButton term={term} lang={langKey} /> */}
      </dt>
      <dd className={definitionClasses.join(" ")}>{definition}</dd>
    </div>
  );
};

const LingoDefinitions = ({
  data,
  language,
}: {
  data: any;
  language: string;
}) => {
  const definitionsMap = new Map<string, string>();
  data.definitions.forEach(
    (definition: { lang: string; definition: string }) => {
      definitionsMap.set(definition.lang, definition.definition);
    }
  );

  const definitions = new Array();

  // Pop the current language to the definitions map
  const currentDefinition = definitionsMap.get(language) || "";
  definitionsMap.delete(language);

  definitions.push(
    <LanguageSpecificDefinition
      key={language}
      language={language}
      definition={currentDefinition}
      currentLanguage={true}
    />
  );

  if (language !== "en") {
    const englishDefinition = definitionsMap.get("en") || "";
    definitionsMap.delete("en");
    definitions.push(
      <LanguageSpecificDefinition
        key={"en"}
        language={"en"}
        definition={englishDefinition}
        currentLanguage={false}
      />
    );
  }

  const lonks = Array.from(definitionsMap.keys())
    .sort()
    .map((lang) => {
      const identifier = slugify(data.term, { lower: true });
      const link = `/${identifier}/${lang}`;
      return (
        <a href={link}>
          <div className="text-center">{lang}</div>
        </a>
      );
    });

  return (
    <div>
      <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
        {definitions}
      </dl>
      <div className="mt-2 grid grid-flow-col divide-x">{lonks}</div>
    </div>
  );
};

export default LingoDefinitions;
