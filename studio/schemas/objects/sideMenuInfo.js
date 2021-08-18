import { AiOutlineInfoCircle } from "react-icons/md";

export default {
  name: "sideMenuInfo",
  title: "Menu Item",
  type: "object",
  icon: AiOutlineInfoCircle,
  fields: [
    {
      name: "assistance",
      title: "Assistance Info",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "number",
          title: "Phone Number",
          type: "string",
        },
      ],
    },
    {
      name: "delivery",
      title: "Delivery Info",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "info",
          title: "Info",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href",
    },
  },
};
