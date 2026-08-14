import { brand } from "./brand";
import { domains } from "./domains";

export const defaultMetadata = {
  title: brand.name,
  description: brand.description,
  metadataBase: new URL(domains.web),
  openGraph: {
    type: "website",
    siteName: brand.name,
    url: domains.web,
    title: brand.name,
    description: brand.description,
  },
} as const;
