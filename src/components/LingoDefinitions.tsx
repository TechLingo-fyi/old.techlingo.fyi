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

  // If the current page language is the
  // same as the definition language
  if (currentLanguage) {
    textSize = "text-2xl";
    textColor = "text-gray-900 dark:text-gray-200";
  }

  const definitionClasses = [textSize, textColor];

  const dtClasses = [
    "mb-1",
    "text-gray-400",
    "md:text-lg",
    "group-hover:md:text-xl",
    "group-hover:text-gray-500",
    "group-hover:dark:text-gray-400",
  ];

  dtClasses.push("collapse hidden");

  return (
    <div key={language} className="flex group flex-col pb-3 pt-3">
      <dt
        title={LangMap.get(language)?.englishLanguageName}
        className={dtClasses.join(" ")}
      >
        {LangMap.get(language)?.languageName}
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
    // definitionsMap.delete("en");
    definitions.push(
      <LanguageSpecificDefinition
        key={"en"}
        language={"en"}
        definition={englishDefinition}
        currentLanguage={false}
      />
    );
  }

  const linkCss = [
    "text-gray-100",
    "bg-gray-400",
    "dark:bg-dark3",
    "rounded",
    "p-2",
    "text-center",
  ];

  const links = Array.from(definitionsMap.keys())
    .sort()
    .map((lang) => {
      const leng = LangMap.get(lang);
      const identifier = slugify(data.term, { lower: true });
      const link = `/${identifier}/${lang}`;
      return (
        <a key={lang} className={linkCss.join(" ")} href={link}>
          {leng?.languageName}
        </a>
      );
    });

  return (
    <div>
      <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
        {definitions}
      </dl>
      <div className="mt-2 grid grid-flow-col space-x-2">{links}</div>
    </div>
  );
};

export default LingoDefinitions;
