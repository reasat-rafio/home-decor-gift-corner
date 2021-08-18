import { AiOutlineMail } from "react-icons/ai";

export default {
  name: "landing.newslatter",
  title: "News Latter",
  type: "object",
  icon: AiOutlineMail,
  fields: [
    {
      name: "headline",
      title: "Headline",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    { name: "icon", title: "Icon", type: "image" },
  ],
  preview: {
    select: {
      title: "headline",
      subtitle: "description",
      media: "icon",
    },
  },
};
