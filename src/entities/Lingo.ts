interface LingoLanguateDefintion {
    lang: string;
    definition: string;
    expanded?: string;
}

export interface Lingo {
  id: string;
  display_name: string;
  slug: string;
  expanded?: string;
  acronym?: boolean;
  numeronym?: boolean;
  definitions: LingoLanguateDefintion[];
}