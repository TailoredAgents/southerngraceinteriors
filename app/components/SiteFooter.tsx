import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p className="eyebrow">Southern Grace Interiors</p>
        <h2>A home should<br /><em>hold your life beautifully.</em></h2>
      </div>
      <div className="footer-grid">
        <div><p className="footer-heading">Explore</p><Link href="/shop">Shop</Link><Link href="/design-services">Design Services</Link><Link href="/portfolio">Inspiration</Link><Link href="/journal">Journal</Link></div>
        <div><p className="footer-heading">Visit</p><Link href="/about">Our Philosophy</Link><Link href="/contact">Begin a Project</Link><Link href="/policies/shipping-returns">Shipping & Returns</Link><Link href="/policies/privacy-terms">Privacy & Terms</Link></div>
        <NewsletterForm />
      </div>
      <div className="footer-base"><span>© {new Date().getFullYear()} Southern Grace Interiors</span><span>Thoughtful design for gracious living.</span></div>
    </footer>
  );
}
