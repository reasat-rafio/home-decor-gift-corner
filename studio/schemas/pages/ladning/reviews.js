import { MdRateReview } from "react-icons/md";

export default {
  name: "landing.reviews",
  title: "Public Review",
  type: "object",
  icon: MdRateReview,
  fields: [
    {
      name: "headline",
      title: "Headline",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          name: "review",
          title: "Review",
          type: "review",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "headline",
    },
  },
};
