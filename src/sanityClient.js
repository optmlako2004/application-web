import { createClient } from "@sanity/client";

export default createClient({
  projectId: "d9rh7gkh",
  dataset: "production",
  useCdn: false, // important en dev
  apiVersion: "2023-05-03", // date figée
});
