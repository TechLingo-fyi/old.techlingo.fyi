import toast from "react-hot-toast";

const CopyButton = ({
  slug,
  lang,
  className,
}: {
  slug: string;
  lang: string;
  className: string;
  size?: number;
}) => {
  const copyToClipBoard = async (event: any) => {
    const { slug, lang } = event.currentTarget.dataset;
    const text =
      "https://techlingo.fyi/" + slug + (lang !== undefined ? "/" + lang : "");
      console.log(text)
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <a
      title="Copy link to clipboard"
      data-slug={slug}
      data-lang={lang}
      onClick={copyToClipBoard}
      className={className}
    >Copy permalink</a>
  );
};
export default CopyButton;
