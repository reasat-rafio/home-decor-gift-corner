import { MdLink } from "react-icons/md";

export default {
  name: "site.foooter",
  title: "Footer",
  type: "object",
  icon: MdLink,
  fields: [
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "nav",
      title: "Navs",
      type: "array",
      of: [
        {
          name: "foooter",
          title: "Footer",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "nav",
              title: "navs",
              type: "array",
              of: [
                {
                  type: "footer.links",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "socials",
      title: "Socials",
      type: "array",
      of: [{ type: "social" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href",
    },
  },
};
