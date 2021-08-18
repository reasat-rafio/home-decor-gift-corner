import { MdLink } from "react-icons/md";

export default {
  name: "footer.links",
  title: "Footer Links",
  type: "object",
  icon: MdLink,
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "href", title: "Link", type: "string" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href",
    },
  },
};
