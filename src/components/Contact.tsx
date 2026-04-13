"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  User,
  AtSign,
} from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to send message");

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 px-8 bg-background">
        <div className="max-w-xl mx-auto text-center py-20 bg-surface-container-high border border-outline-variant rounded-[32px] backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h2 className="text-4xl font-headline font-black text-on-background mb-4">
            Message Transmitted
          </h2>

          <p className="text-on-surface-variant mb-8">
            Your signals have been received. I&apos;ll get back to you within 24
            hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-primary font-label text-xs uppercase tracking-widest hover:underline"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24 px-8 bg-background relative overflow-hidden"
      id="contact"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hero-glow-purple opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Context */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-background mb-8"
            >
              Let&apos;s build the{" "}
              <span className="text-gradient">next phase.</span>
            </motion.h2>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-lg">
              Whether you have a specific product vision or just want to discuss
              strategic engineering — I&apos;m ready to dive in.
            </p>

            <div className="space-y-8">
              <ContactInfoItem
                icon={<Mail className="text-primary" />}
                label="Direct Signal"
                value="prafulthapa97@gmail.com"
              />
              <ContactInfoItem
                icon={<MessageSquare className="text-secondary" />}
                label="Response Time"
                value="< 24 Hours"
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-8 md:p-12 rounded-[40px] border border-outline-variant"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FloatingInput
                  label="Your Name"
                  name="name"
                  icon={<User size={18} />}
                  required
                />
                <FloatingInput
                  label="Email Address"
                  name="email"
                  icon={<AtSign size={18} />}
                  type="email"
                  required
                />
              </div>
              <FloatingInput
                label="Subject"
                name="subject"
                icon={<MessageSquare size={18} />}
              />
              <div className="relative">
                <textarea
                  required
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 text-on-background placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors resize-none font-body"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50 transition-opacity"
              >
                {isSubmitting ? (
                  "Transmitting..."
                ) : (
                  <>
                    Initiate Conversation <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingInput({
  label,
  name,
  icon,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  icon: React.ReactNode;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={label}
        className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-14 pr-6 py-4 text-on-background placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors font-body"
      />
    </div>
  );
}

function ContactInfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  const isEmail = value.includes("@");
  const content = (
    <div className="flex items-center gap-6 group cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-0.5">
          {label}
        </div>
        <div className="text-on-background font-headline font-bold text-lg">
          {value}
        </div>
      </div>
    </div>
  );

  if (isEmail) {
    return <a href={`mailto:${value}`}>{content}</a>;
  }

  return content;
}
