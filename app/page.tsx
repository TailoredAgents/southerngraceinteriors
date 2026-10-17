import Image from "next/image";
import Link from "next/link";
import { collections, journal, products, projects } from "./data/site";
import { ProductCard } from "./components/ProductCard";

export default function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 6);
  return (
    <>
      <section className="home-hero">
        <Image src="/images/home-hero-v2.webp" alt="Sunlit living room layered with linen, warm wood, and quiet green accents" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy reveal">
          <p className="eyebrow">Southern Grace Interiors</p>
          <h1>Beautiful spaces.<br /><em>A life well lived.</em></h1>
          <p>Timeless furnishings and thoughtful design for a home that feels entirely yours.</p>
          <div className="hero-actions"><Link className="button button-light" href="/shop">Shop the Collection</Link><Link className="text-link light" href="/design-services">Explore Design Services <span>→</span></Link></div>
        </div>
        <div className="hero-scroll">Scroll to discover <i /></div>
      </section>

      <section id="welcome" className="intro-section section-shell">
        <p className="section-index">01 / WELCOME HOME</p>
        <div><p className="eyebrow">Our Point of View</p><h2>The art of<br /><em>feeling at home.</em></h2></div>
        <div className="intro-copy"><p>A beautiful home is more than an arrangement of lovely things. It is a feeling—gracious, comfortable, and unmistakably personal.</p><p>We pair timeless foundations with collected character, creating spaces designed not only to be admired, but truly lived in.</p><Link className="text-link" href="/about">Discover our philosophy <span>→</span></Link></div>
      </section>

      <section id="shop-and-studio" className="pathways section-shell">
        <Link href="/shop" className="path-card path-shop"><Image src="/images/path-shop-v2.webp" alt="Layered living room with linen seating and collected natural materials" fill sizes="(max-width: 800px) 100vw, 55vw" /><div><p className="eyebrow">The Shop</p><h2>Objects of<br /><em>lasting beauty.</em></h2><span>Explore furnishings →</span></div></Link>
        <Link href="/design-services" className="path-card path-studio"><Image src="/images/path-studio-v2.webp" alt="Architectural dining room with warm walnut and softly tailored seating" fill sizes="(max-width: 800px) 100vw, 45vw" /><div><p className="eyebrow">The Studio</p><h2>Rooms with<br /><em>a sense of belonging.</em></h2><span>Explore design services →</span></div></Link>
      </section>

      <section id="shop-by-room" className="room-section section-shell">
        <div className="section-heading"><div><p className="eyebrow">Shop by Room</p><h2>Find your<br /><em>starting point.</em></h2></div><p>Considered pieces for every room—designed to layer beautifully and live graciously.</p></div>
        <div className="room-strip">{collections.map((collection) => <Link href={`/shop/${collection.slug}`} key={collection.slug} className="room-link"><div><Image src={collection.image} alt={`${collection.name} collection`} fill sizes="(max-width: 700px) 76vw, 20vw" /></div><span><strong>{collection.name}</strong><b>Explore</b></span></Link>)}</div>
      </section>

      <section className="featured-section"><div className="section-shell"><div className="section-heading centered"><div><p className="eyebrow">The Current Edit</p><h2>Pieces worth<br /><em>living with.</em></h2></div><Link className="text-link" href="/shop">View the full collection <span>→</span></Link></div><div className="product-grid home-products">{featured.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 2} />)}</div></div></section>

      <section id="design-services" className="services-home section-shell">
        <div className="services-photo"><Image src="/images/services-editorial-v2.webp" alt="Layered dining-room vignette with walnut, linen, and hand-finished objects" fill sizes="(max-width: 800px) 100vw, 48vw" /><span>DESIGN, WITH INTENTION</span></div>
        <div className="services-story"><p className="eyebrow">Interior Design Services</p><h2>A thoughtful home,<br /><em>made deeply personal.</em></h2><p>Whether reimagining one room or shaping an entire home, our process is collaborative, clear, and grounded in the way you want to live.</p><ol><li><span>01</span><div><h3>Connect</h3><p>We begin with your home, your needs, and the feeling you want to create.</p></div></li><li><span>02</span><div><h3>Create</h3><p>We shape a layered design story through space, material, color, and light.</p></div></li><li><span>03</span><div><h3>Bring It Home</h3><p>Every detail comes together in a room that feels effortless and entirely yours.</p></div></li></ol><Link className="button button-dark" href="/design-services">How We Can Work Together</Link></div>
      </section>

      <section className="inspiration-section"><div className="section-shell"><div className="section-heading"><div><p className="eyebrow">Inspiration Studies</p><h2>Ideas for<br /><em>gracious living.</em></h2></div><p>Visual stories exploring palette, proportion, and atmosphere—the beginning of what your own home could become.</p></div><div className="project-mosaic">{projects.map((project, index) => <Link href={`/portfolio/${project.slug}`} key={project.slug} className={`project-tile tile-${index + 1}`}><Image src={project.image} alt={project.title} fill sizes="(max-width: 800px) 100vw, 50vw" /><span><small>Inspiration Study</small>{project.title}<b>View story →</b></span></Link>)}</div><Link href="/portfolio" className="text-link mosaic-link">View all inspiration <span>→</span></Link></div></section>

      <section id="shop-the-look" className="shop-look section-shell">
        <div className="look-image"><Image src="/images/reading-room-v2.webp" alt="Sunlit reading room with a sculptural chair, brass lamp, and walnut table" fill sizes="(max-width: 900px) 100vw, 58vw" /></div>
        <div className="look-products"><p className="eyebrow">Shop the Look</p><h2>The quiet<br /><em>reading room.</em></h2><p>Natural texture, low light, and a few beautifully made pieces create a corner that invites you to stay awhile.</p>{[products[1], products[12], products[16]].map((product) => <Link href={`/products/${product.slug}`} key={product.id}><div><b>{product.name}</b><small>${(product.price / 100).toLocaleString()}</small></div><i>View</i></Link>)}</div>
      </section>

      <section className="story-section"><div className="story-inner section-shell"><div><p className="eyebrow">Southern Grace</p><h2>Beauty with warmth.<br />Elegance with <em>ease.</em></h2></div><div><p>Southern Grace Interiors is built on a simple belief: the most beautiful rooms are the ones that make life feel better.</p><p>Our point of view honors enduring materials, gracious proportions, and the small details that turn a house into somewhere you belong.</p><Link className="text-link light" href="/about">Our story <span>→</span></Link></div></div></section>

      <section className="journal-home section-shell"><div className="section-heading centered"><div><p className="eyebrow">From the Journal</p><h2>Notes on<br /><em>living beautifully.</em></h2></div><Link href="/journal" className="text-link">Read all stories <span>→</span></Link></div><div className="journal-grid">{journal.slice(0, 3).map((entry, index) => <Link href={`/journal/${entry.slug}`} key={entry.slug} className="journal-card"><div><Image src={entry.image} alt="" fill loading="eager" sizes="(max-width: 700px) 100vw, 33vw" /></div><p>{entry.category} · 0{index + 1}</p><h3>{entry.title}</h3><span>Read the story →</span></Link>)}</div></section>

      <section className="home-cta"><Image src="/images/home-cta-v2.webp" alt="Candlelit dining room prepared for a gracious evening gathering" fill loading="eager" sizes="100vw" /><div /><article><p className="eyebrow">Begin Your Home</p><h2>Let’s create something<br /><em>beautiful together.</em></h2><p>Your home deserves a thoughtful beginning. Tell us what you are imagining.</p><Link className="button button-light" href="/contact">Start a Conversation</Link></article></section>
    </>
  );
}
