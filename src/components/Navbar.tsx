"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Expertise", href: "/#expertise" },
  { name: "Blog", href: "/blog" },
  { name: "Connect", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(185,10,252,0.1)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8">
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-on-background font-headline"
        >
          Praful
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-headline font-bold tracking-tight text-sm uppercase text-on-surface-variant hover:text-white transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold text-sm tracking-tight hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            Connect
          </Link>
        </div>
      </nav>
    </header>
  );
}
