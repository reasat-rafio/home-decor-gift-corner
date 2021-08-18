import { AiTwotoneTags } from "react-icons/ai";

export default {
  name: "tags",
  title: "Product Tag",
  icon: AiTwotoneTags,
  type: "document",
  fields: [
    { name: "tag", type: "string", title: "Tag Title" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "tag",
      },
    },
  ],
  preview: {
    select: {
      title: "tag",
    },
  },
};
