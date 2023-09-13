import LangMap from "../l18n/Languages";
import slugify from "slugify";
import { useTranslations } from "../l18n/ui";
import ExpandedTerm from "./detail/ExpandedTerm";
import ContextLinks from "./detail/ContextLinks";


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
  "mb-1",
  "text-5xl",
  "font-bold",
  "tracking-tight",
  "text-gray-900",
  "dark:text-white",
];

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

const LingoDetail = ({
  data,
  viewingLanguage,
  slug,
  shareableText,
}: {
  data: any;
  viewingLanguage: string;
  slug: string;
  shareableText: string;
}) => {
  var termExpansion = [];
  if (data.expanded) {
    for (var i = 0; i < data.expanded.length; i++) {
      const character = data.expanded[i];
      // If character is uppercase, make it bold
      if (character === character.toUpperCase() && data.acronym) {
        termExpansion.push(<span className="font-bold">{character}</span>);
      } else {
        termExpansion.push(character);
      }
    }
  }

  const definitionsMap = new Map<string, string>();
  data.definitions.forEach(
    (definition: { lang: string; definition: string }) => {
      definitionsMap.set(definition.lang, definition.definition);
    }
  );
  const englishDefinition = definitionsMap.get("en");
  const currentLanguageDefinition = definitionsMap.get(viewingLanguage);
  const currentLangSpec = LangMap.get(viewingLanguage) || LangMap.get("en");
  if (currentLangSpec === undefined) {
    console.error("No language found for " + viewingLanguage);
  }
  const t = useTranslations(viewingLanguage);
  const linkCss = [

    "underline",
  ];

  const languages = Array.from(definitionsMap.keys())
  const links = languages.filter((lang) => lang !== viewingLanguage)
    .sort((a, b) => {
      const aLang = LangMap.get(a);
      const bLang = LangMap.get(b);
      if (aLang === undefined || bLang === undefined) {
        return 0;
      }
      return aLang.languageName.localeCompare(bLang.languageName);
    })
    .map((lang, idx) => {
      const leng = LangMap.get(lang);
      const identifier = slugify(data.display_name, { lower: true });
      const link = `/${identifier}/${lang}`;
      return (
        <span>
        <a key={lang} className={linkCss.join(" ")} href={link}>
          {leng?.languageName}
        </a>
        {idx < languages.length-2 ? ", ": " " }
        </span>
      );
    });

  return (
    <div className={cardStyle.join(" ")}>
      <h3 className={termStyle.join(" ")}>{data.display_name}</h3>
      <ExpandedTerm lingo={data} viewingLanguage={viewingLanguage} />
      <div>
        <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <LanguageSpecificDefinition
              key={viewingLanguage}
              language={viewingLanguage}
              definition={currentLanguageDefinition}
              currentLanguage={true}
            />
          {viewingLanguage != "en" && (
            <LanguageSpecificDefinition
              key={"en"}
              language={"en"}
              definition={englishDefinition}
              currentLanguage={false}
            />
          )}
        </dl>
        <div className="mt-2 text-gray-600">
          {t("lingo.otherLanguages")} {links}
        </div>
      </div>
      <ContextLinks shareableText={shareableText} slug={slug} viewingLanguage={viewingLanguage} />
    </div>
  );
};

export default LingoDetail;
