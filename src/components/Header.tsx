"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { FiArrowUpRight, FiCommand } from "react-icons/fi";
function Account() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return <span className="muted small">Loading account…</span>;
  return isSignedIn ? <UserButton afterSignOutUrl="/" /> : <SignInButton mode="modal"><button className="button button-small">Sign in <FiArrowUpRight /></button></SignInButton>;
}
export default function Header() {
  const pathname = usePathname();
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" href="/" aria-label="MicroSaaS home"><span className="brand-mark"><FiCommand /></span>micro<span className="brand-light">saas</span><span className="brand-dot">.</span></Link>
    <nav aria-label="Main navigation"><Link className={pathname === "/" ? "nav-link active" : "nav-link"} href="/">Discover</Link><Link className={pathname === "/profile" ? "nav-link active" : "nav-link"} href="/profile">My plans</Link></nav>
    <div className="header-account">{process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? <Account /> : <Link className="button button-small" href="/profile">My workspace <FiArrowUpRight /></Link>}</div>
  </div></header>;
}
