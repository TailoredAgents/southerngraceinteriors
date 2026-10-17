import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/data/site";
import { createMetadata } from "@/app/lib/seo";

export const metadata = createMetadata({ title: "Design Inspiration", description: "Explore interior design inspiration studies in palette, proportion, and atmosphere.", path: "/portfolio", image: "/images/portfolio-garden-v2.webp", imageAlt: "Layered living room in softened greens and natural textures" });
export default function PortfolioPage() {
  return <><section className="editorial-title portfolio-title section-shell"><p className="eyebrow">Design Inspiration</p><h1>Rooms imagined for<br /><em>a life well lived.</em></h1><p>Visual studies in warmth, proportion, and atmosphere. Each story is an exploration of possibility—not a claim of completed client work.</p></section><section className="portfolio-list section-shell">{projects.map((project, index) => <Link href={`/portfolio/${project.slug}`} key={project.slug} className={index === 0 ? "portfolio-feature" : "portfolio-secondary"}><div className="portfolio-image"><Image src={project.image} alt={project.title} fill priority={index === 0} sizes={index === 0 ? "100vw" : "(max-width: 800px) 100vw, 50vw"} /></div><article><p className="eyebrow">Inspiration Study · 0{index + 1}</p><h2>{project.title}</h2><p>{project.subtitle}</p><span>Explore the story →</span></article></Link>)}</section></>;
}
