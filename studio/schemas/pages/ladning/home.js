import { AiOutlineHome } from "react-icons/ai";

export default {
  name: "landing.home",
  title: "Home",
  type: "object",
  icon: AiOutlineHome,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          description: "Important for SEO and accessibility",
          type: "string",
        },
      ],
    },

    {
      name: "button",
      title: "Button",
      type: "ctaButton",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "backgroundImage",
    },
  },
};
