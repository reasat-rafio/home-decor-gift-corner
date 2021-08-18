import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoShareSocial,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from "react-icons/io5";

export default {
  name: "social",
  title: "Social",
  type: "object",
  icon: IoShareSocial,
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "facebook", value: "facebook" },
          { title: "twitter", value: "twitter" },
          { title: "linkedin", value: "linkedin" },
          { title: "instagram", value: "instagram" },
          { title: "whatsapp", value: "whatsapp" },
          { title: "youtube", value: "youtube" },
        ],
      },
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
    },
    {
      name: "url",
      title: "URL",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "url",
      media: "logo",
      type: "type",
    },
    prepare({ title, type }) {
      return {
        title,
        media:
          type === "facebook"
            ? IoLogoFacebook
            : type === "twitter"
            ? IoLogoTwitter
            : type === "whatsapp"
            ? IoLogoWhatsapp
            : type === "linkedin"
            ? IoLogoLinkedin
            : type === "youtube"
            ? IoLogoYoutube
            : type === "instagram"
            ? IoLogoInstagram
            : IoShareSocial,
      };
    },
  },
};
