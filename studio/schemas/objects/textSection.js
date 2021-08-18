export default {
  type: "object",
  name: "textSection",
  title: "Text",
  fields: [
    {
      name: "label",
      type: "string",
      title: "Label",
    },
    {
      name: "heading",
      type: "string",
      title: "Heading",
    },
    {
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: `${heading}`,
        subtitle: "Text section",
      };
    },
  },
};
