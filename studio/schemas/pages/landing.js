import { AiOutlineHome } from "react-icons/ai";

export default {
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  icon: AiOutlineHome,
  fields: [
    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },
    { name: "poster", title: "Poster", type: "image" },
    {
      name: "screens",
      title: "Screens",
      type: "array",
      of: [
        { type: "landing.home" },
        { type: "landing.policy" },
        { type: "landing.reviews" },
        { type: "landing.newslatter" },
      ],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};
