import type { Lingo } from "../../entities/Lingo";
import LangMap from "../../l18n/Languages";
import { useTranslations } from "../../l18n/ui";

const OtherLanguageLinks = ({
    lingo,
    viewingLanguage,
  }: {
    lingo: Lingo;
    viewingLanguage: string;
  }) => {

    const t = useTranslations(viewingLanguage);
    
    const languages = Array.from(lingo.definitions)
        .map((definition) => definition.lang)
        .sort()
        .filter((lang) => lang !== viewingLanguage);


    const links = languages.map(
        (lang, idx) => {
            const leng = LangMap.get(lang);
            return (
                <span>
                    <a key={lang} className="underline" href={`/${lingo.slug}/${lang}`}>
                          {leng?.languageName}
                    </a>
                    {idx < languages.length- 1 && ", "}
                </span>
            )
        }
    );

    return (<div>{t("lingo.otherLanguages")} {links}</div>)
}

export default OtherLanguageLinks;
