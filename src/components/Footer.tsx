import Link from "next/link";
export default function Footer() {
  return <footer className="site-footer"><div><strong>Small ideas. Real possibilities.</strong><p>Build with intention. Validate before you invest.</p></div><div className="footer-links"><Link href="/profile">My plans</Link><Link href="/privacyPolicy">Privacy</Link><a href="mailto:assemghor.reda@gmail.com">Contact</a></div><span className="small muted">© {new Date().getFullYear()} MicroSaaS</span></footer>;
}
