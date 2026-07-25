import React from 'react';

interface SEOJsonLdProps {
  type: 'Organization' | 'Article' | 'FAQ' | 'Breadcrumb' | 'Course';
  title?: string;
  description?: string;
  url?: string;
  author?: string;
  datePublished?: string;
  faqList?: { question: string; answer: string }[];
}

export const SEOJsonLd: React.FC<SEOJsonLdProps> = ({
  type,
  title = "Bofferly - Complete Islamic Portal, Quran & Hadith Hub",
  description = "Bofferly is your comprehensive Islamic portal featuring Quran, Hadith library, Prayer tools, Seerah portal, Fatwas, Learning Academy, and Islamic tools.",
  url = "https://bofferly.com",
  author = "Bofferly Editorial Team",
  datePublished = "2026-07-25",
  faqList = []
}) => {
  let schemaData: any = {};

  if (type === 'Organization') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bofferly",
      "url": url,
      "logo": "https://bofferly.com/logo.png",
      "description": description,
      "sameAs": [
        "https://facebook.com/bofferly",
        "https://twitter.com/bofferly",
        "https://instagram.com/bofferly"
      ]
    };
  } else if (type === 'Article') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bofferly",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bofferly.com/logo.png"
        }
      },
      "datePublished": datePublished,
      "mainEntityOfPage": url
    };
  } else if (type === 'FAQ') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  } else if (type === 'Course') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": title,
      "description": description,
      "provider": {
        "@type": "Organization",
        "name": "Bofferly Learning Academy",
        "sameAs": url
      }
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
