import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/app/components/JsonLd";
import { projects } from "@/app/data/site";
import { breadcrumbSchema, createMetadata } from "@/app/lib/seo";
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return createMetadata({ title: "Inspiration", description: "Interior design inspiration from Southern Grace Interiors.", path: `/portfolio/${slug}`, noIndex: true });
  return createMetadata({ title: project.title, description: project.subtitle, path: `/portfolio/${project.slug}`, image: project.image, imageAlt: project.title });
}
export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = projects.find((item) => item.slug === slug); if (!project) notFound(); return <><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Design Inspiration", path: "/portfolio" }, { name: project.title, path: `/portfolio/${project.slug}` }])} /><section className="project-hero"><Image src={project.image} alt={project.title} fill priority sizes="100vw" /><div /><article><p className="eyebrow">Inspiration Study</p><h1>{project.title}</h1><p>{project.subtitle}</p></article></section><section className="project-story section-shell"><div><p className="eyebrow">The Direction</p><h2>Designed around<br /><em>a feeling.</em></h2></div><div><p>{project.description}</p><div className="palette" aria-label="Color palette">{project.palette.map((color) => <i key={color} style={{ background: color }} title={color} />)}</div></div></section><section className="project-gallery section-shell">{project.gallery.map((image, index) => <div key={image} className={`project-gallery-${index + 1}`}><Image src={image} alt={`${project.title} detail ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 60vw" /></div>)}</section><section className="project-note section-shell"><p>Inspiration photography is used to communicate a design direction and is not represented as client work.</p><Link className="button button-dark" href="/contact">Imagine Your Home With Us</Link></section></>; }
