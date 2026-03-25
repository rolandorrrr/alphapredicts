interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AlphaPredicts",
  url: "https://alphapredicts.com",
  description:
    "High-stakes logic for the sovereign analyst. Deciphering the world through the lens of probability.",
  foundingDate: "2024",
  sameAs: [],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AlphaPredicts",
  url: "https://alphapredicts.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://alphapredicts.com/analysis?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export function articleSchema({
  title,
  description,
  author,
  datePublished,
  image,
}: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "AlphaPredicts",
      url: "https://alphapredicts.com",
    },
    datePublished,
    ...(image && { image }),
  };
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AlphaPredicts Pro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alpha Pro is a premium subscription giving you real-time signal alerts, private Discord access, API hooks, and exclusive whale-tracking tools used by institutional analysts.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Tactical and Sovereign plans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tactical ($149/mo) gives full access to real-time signals and the core dashboard. Sovereign ($1,250/yr) adds API hooks, private mentorship, and priority execution — saving 30% vs monthly.",
      },
    },
    {
      "@type": "Question",
      name: "How is analyst accuracy tracked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every prediction is tracked on-chain. Maintain a >75% win rate over 30 days to earn reputational tokens and unlock high-level API access.",
      },
    },
  ],
};
