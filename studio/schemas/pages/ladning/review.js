import { MdRateReview } from "react-icons/md";

export default {
  name: "review",
  title: "Review",
  type: "object",
  icon: MdRateReview,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    { name: "image", title: "Image", type: "image" },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
};
