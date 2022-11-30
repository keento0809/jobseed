import { createClient } from "contentful";

const useContentful = () => {
  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE!,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN!,
    host: process.env.REACT_APP_CONTENTFUL_HOST!,
  });
  const getDocuments = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "document",
        select: "fields",
      });
      const sanitizedEntries = entries.items.map((item) => {});
    } catch (error) {
      console.log(error);
    }
  };
};

export default useContentful;
