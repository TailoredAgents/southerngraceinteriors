import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/app/components/JsonLd";
import { journal } from "@/app/data/site";
import { absoluteUrl, breadcrumbSchema, createMetadata, siteName } from "@/app/lib/seo";

export function generateStaticParams() {
  return journal.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = journal.find((item) => item.slug === slug);
  if (!entry) return createMetadata({ title: "Journal", description: "Notes from Southern Grace Interiors.", path: `/journal/${slug}`, noIndex: true });
  return createMetadata({
    title: entry.title,
    description: entry.excerpt,
    path: `/journal/${entry.slug}`,
    image: entry.image,
    imageAlt: `Interior illustrating ${entry.title}`,
    type: "article",
    publishedTime: new Date(entry.date).toISOString(),
  });
}

export default async function JournalDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = journal.find((item) => item.slug === slug);
  if (!entry) notFound();
  const articleUrl = `/journal/${entry.slug}`;

  return (
    <article className="article-page">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.title,
          description: entry.excerpt,
          image: absoluteUrl(entry.image),
          datePublished: new Date(entry.date).toISOString(),
          mainEntityOfPage: absoluteUrl(articleUrl),
          author: { "@type": "Organization", name: siteName },
          publisher: { "@type": "Organization", name: siteName },
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: entry.title, path: articleUrl },
        ]),
      ]} />
      <header className="article-header section-shell">
        <p className="eyebrow">{entry.category} · {entry.date}</p>
        <h1>{entry.title}</h1>
        <p>{entry.excerpt}</p>
        <span>{entry.readTime}</span>
      </header>
      <div className="article-image"><Image src={entry.image} alt={`Interior illustrating ${entry.title}`} fill priority sizes="100vw" /></div>
      <div className="article-body">
        {entry.paragraphs.map((paragraph, index) => index === 0 ? <p className="lead" key={paragraph}>{paragraph}</p> : <p key={paragraph}>{paragraph}</p>)}
        <hr />
        <p className="article-signoff">A considered home is built one thoughtful choice at a time.</p>
        <Link className="text-link" href="/journal">Back to the journal <span>→</span></Link>
      </div>
    </article>
  );
}
