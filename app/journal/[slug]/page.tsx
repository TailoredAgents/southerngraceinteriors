import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journal } from "@/app/data/site";
export function generateStaticParams() { return journal.map((entry) => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const entry = journal.find((item) => item.slug === slug); return { title: entry?.title ?? "Journal", description: entry?.excerpt }; }
export default async function JournalDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = journal.find((item) => item.slug === slug); if (!entry) notFound(); return <article className="article-page"><header className="article-header section-shell"><p className="eyebrow">{entry.category} · {entry.date}</p><h1>{entry.title}</h1><p>{entry.excerpt}</p><span>{entry.readTime}</span></header><div className="article-image"><Image src={entry.image} alt="Interior illustrating the journal story" fill priority sizes="100vw" /></div><div className="article-body">{entry.paragraphs.map((paragraph, index) => index === 0 ? <p className="lead" key={paragraph}>{paragraph}</p> : <p key={paragraph}>{paragraph}</p>)}<hr /><p className="article-signoff">A considered home is built one thoughtful choice at a time.</p><Link className="text-link" href="/journal">Back to the journal <span>→</span></Link></div></article>; }
