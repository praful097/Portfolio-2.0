"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Code, 
  Users2, 
  Rocket, 
  BarChart, 
  ShieldAlert 
} from "lucide-react";

const superpowers = [
  {
    title: "Agile & Scrum Mastery",
    description: "Orchestrating high-performing teams using refined Agile methodologies and Scrum frameworks.",
    icon: <Users2 className="text-secondary" />,
    color: "secondary"
  },
  {
    title: "Product Roadmap Strategy",
    description: "Aligning technical roadmaps with business objectives to ensure every feature drives value.",
    icon: <BarChart className="text-primary" />,
    color: "primary"
  },
  {
    title: "Team Leadership",
    description: "Mentoring engineers and fostering a culture of ownership, quality, and continuous improvement.",
    icon: <Brain className="text-secondary-dim" />,
    color: "secondary-dim"
  },
  {
    title: "Technical Fluency",
    description: "Still diving into code when needed. Bridging the gap between engineering and stakeholders.",
    icon: <Code className="text-tertiary" />,
    color: "tertiary"
  },
  {
    title: "Risk Management",
    description: "Identifying bottlenecks early and mitigating risks to ensure on-time, on-budget delivery.",
    icon: <ShieldAlert className="text-error" />,
    color: "error"
  },
  {
    title: "Flawless Delivery",
    description: "Obsessive focus on shipping quality products that exceed stakeholder expectations.",
    icon: <Rocket className="text-primary-dim" />,
    color: "primary-dim"
  }
];


export default function About() {
  return (
    <section id="expertise" className="py-32 px-8 bg-surface-container-low relative border-t border-outline-variant">

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h2 className="text-4xl font-black font-headline tracking-tighter mb-8 text-on-background flex items-center gap-4">

              Origin Story
              <span className="h-1 w-12 bg-primary"></span>
            </h2>
            <div className="space-y-6 text-on-surface-variant font-body leading-relaxed text-lg">
              <p>
                Hi, I’m <span className="text-primary font-bold">Praful</span>. I started my career as a Frontend Engineer and quickly grew into a Lead, shipping pixel-perfect, performant web experiences at scale.
              </p>
              <p>
                Over time I realized my real passion lies in the <span className="text-white">bigger picture</span> — planning, aligning teams, mitigating risks, and turning complex initiatives into successful launches.
              </p>
              <p>
                That’s why I transitioned fully into <span className="text-white">Project Management and Product Ownership</span>. Today I thrive as a delivery facilitator, Scrum practitioner, and team leader who loves mentoring engineers while keeping projects on time and exceeding expectations.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {superpowers.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: "rgba(193, 255, 254, 0.3)" }}
                className="p-8 bg-surface-container-highest/40 backdrop-blur-xl rounded-xl border border-outline-variant/10 group transition-all"
              >
                <div className="mb-4 text-3xl">
                  {skill.icon}
                </div>
                <h3 className="font-headline font-bold text-xl mb-2 text-on-background">{skill.title}</h3>

                <p className="text-sm text-on-surface-variant leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
