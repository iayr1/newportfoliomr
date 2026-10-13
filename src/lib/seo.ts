// Single source of truth for search (SEO) and AI-answer-engine (GEO) metadata.
// Absolute URLs everywhere: crawlers and social previews ignore relative canonicals/og:urls.

export const SITE_URL = "https://mayuro.lovable.app";
export const SITE_NAME = "Mayur Chaudhari";
export const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b1c4b602-3de3-4ac2-9607-51748b390274";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

/** Standard title/description/canonical/Open Graph/Twitter tags for a page. */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = "Mayur Chaudhari — AI Business Transformation Manager",
  type = "website",
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  keywords?: string;
}) {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(keywords ? [{ name: "keywords", content: keywords }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const jsonLd = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});

export type Faq = { q: string; a: string };

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Canonical description of Mayur as an entity — what answer engines quote when asked "who is…". */
export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Mayur Chaudhari",
  alternateName: ["Mayur", "iayr1"],
  url: `${SITE_URL}/`,
  image: DEFAULT_OG_IMAGE,
  jobTitle: "AI Systems & Business Transformation Manager",
  description:
    "Mayur Chaudhari is an AI Business Transformation Manager based in Mumbai, India, with 6+ years in technology. He designs Agentic AI systems, multi-agent workflows (LangGraph, CrewAI), RAG pipelines, CRM automation (Zoho CRM, Salesforce), and Flutter apps that deliver measurable business impact.",
  email: "mailto:mayurailead@gmail.com",
  telephone: "+91-808-720-5660",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  nationality: { "@type": "Country", name: "India" },
  worksFor: { "@type": "Organization", name: "EDGE" },
  hasOccupation: {
    "@type": "Occupation",
    name: "AI Business Transformation Manager",
    occupationLocation: { "@type": "City", name: "Mumbai" },
    skills:
      "Agentic AI, Multi-Agent Systems, LangGraph, CrewAI, LangChain, RAG, LLM Applications, Workflow Automation, n8n, Make, Zapier, Zoho CRM, Salesforce, FastAPI, Flutter, AI Strategy",
  },
  knowsAbout: [
    "Agentic AI",
    "Multi-agent systems",
    "LangGraph",
    "CrewAI",
    "LangChain",
    "Retrieval-augmented generation (RAG)",
    "Large language models",
    "Generative AI",
    "Workflow automation",
    "Business process automation",
    "n8n",
    "Zapier",
    "Zoho CRM",
    "Salesforce",
    "AI strategy",
    "Digital transformation",
    "Chatbot development",
    "Flutter",
    "FastAPI",
  ],
  sameAs: ["https://www.linkedin.com/in/iayr1", "https://github.com/iayr1"],
};
