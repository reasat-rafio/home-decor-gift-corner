export default {
  name: "siteConfig",
  type: "document",
  title: "Site configuration",

  fields: [
    {
      title: "Brand logo",
      description:
        "Best choice is to use an SVG where the color are set with currentColor",
      name: "logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: "menu",
      title: "Menu",
      type: "array",
      of: [{ type: "menuItem" }],
    },
    { name: "sideMenuInfo", type: "sideMenuInfo" },
    {
      name: "copyright",
      title: "Copyright",
      type: "string",
    },
    {
      name: "footer",
      title: "Footer",
      type: "site.foooter",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "logo",
    },
  },
};
