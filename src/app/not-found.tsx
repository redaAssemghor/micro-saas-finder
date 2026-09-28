import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" className="workspace simple-page"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>A fresh start?</h1><p>This page does not exist. Your next idea might.</p><Link className="button" href="/">Back to discover</Link></main>;
}
