import { FaRegHandshake } from "react-icons/fa";

export default {
  name: "deal",
  title: "Deals",
  type: "document",
  icon: FaRegHandshake,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
};
