import { RiPagesLine } from "react-icons/ri";

export default {
  name: "landing.policy",
  title: "Policies",
  type: "object",
  icon: RiPagesLine,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [
        {
          name: "policy",
          title: "Policy",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },

            {
              name: "description",
              title: "Description",
              type: "text",
            },
            { name: "icon", title: "Icon", type: "image" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare({ title }) {
      return {
        title: "Policies",
      };
    },
  },
};
