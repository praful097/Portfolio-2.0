"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import {
  GithubSVG,
  LinkedinSVG,
  TwitterSVG,
  InstagramSVG,
  FacebookSVG,
} from "./icons/SocialIcons";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <Link
            href="/"
            className="text-2xl font-black text-on-background font-headline tracking-tighter"
          >
            Praful
          </Link>

          <div className="flex gap-8 my-8 md:my-0">
            <SocialLink
              icon={<Mail size={20} />}
              href="mailto:prafulthapa97@gmail.com"
              label="Email"
            />
            <SocialLink
              icon={<TwitterSVG size={20} />}
              href="https://x.com/Praful611793"
              label="Twitter"
            />
            <SocialLink
              icon={<LinkedinSVG size={20} />}
              href="https://www.linkedin.com/in/praful-thapa"
              label="LinkedIn"
            />
            <SocialLink
              icon={<GithubSVG size={20} />}
              href="https://github.com/praful097"
              label="GitHub"
            />
            <SocialLink
              icon={<InstagramSVG size={20} />}
              href="https://www.instagram.com/prafulthapa97"
              label="Instagram"
            />
            <SocialLink
              icon={<FacebookSVG size={20} />}
              href="https://www.facebook.com/praful.thapa.2025"
              label="Facebook"
            />
          </div>

          <div className="font-label text-xs tracking-widest uppercase text-on-surface-variant">
            © 2026 Praful. Engineered for Precision.
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4"
          >
            Let&apos;s create something permanent
          </motion.h2>
          <motion.a
            href="mailto:prafulthapa97@gmail.com"
            whileHover={{ color: "var(--primary)" }}
            className="text-2xl md:text-3xl font-black font-headline transition-colors duration-500 cursor-pointer block text-on-background"
          >
            prafulthapa97@gmail.com
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      whileHover={{ y: -4, color: "#c1fffe" }}
      className="text-on-surface-variant transition-colors duration-300"
    >
      {icon}
    </motion.a>
  );
}
