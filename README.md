TechLingo.fyi
=============

TechLingo.fyi is a free resource for those wanting to break into the tech industry.

Even now with all my years of experience, I still come across acronyms and words that are new to me.

That is why I created TechLingo.fyi to help people understand those mysterious acronyms and jargon that youmay come across in your career as a software developer or data scientist.

The site is built using Astro, a static site generator that uses React and Markdown. It is completely open source and you can find the code on GitHub.

## Adding a new TechLingo

To add a new term and its definition it is necessary to add a new file to the `lingos` folder, please follow this structure:

```json
{
  "display_name": "Human frendly name",
  "definitions": [
    {
      "lang": "en",
      "definition": "Short definition in english."
    },
    {
      "lang": "es",
      "definition": "Short definition in spanish"
    }
  ],
  "slug": "human-friendly-name"
}
```

The name of this file must be the same as the value of the property `slug`.
