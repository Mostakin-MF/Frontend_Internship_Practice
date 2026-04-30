"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Layers,
  BarChart3,
  MessageSquare,
  Edit3,
  MapPin,
  Palette,
  Lightbulb,
  Layout,
  ShoppingBag,
  ListOrdered,
  TrendingUp,
  Sidebar,
  LogIn,
  CheckSquare,
  Bell,
  Grid3x3,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  tags: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Animated Buttons",
    description: "Custom animated button components with various hover effects and transitions. Showcases CSS and interactive button design patterns.",
    path: "/animated_button_demo",
    icon: <Zap className="w-6 h-6" />,
    tags: ["CSS", "Animation", "Components"],
    featured: true,
  },
  {
    title: "Basic Animation",
    description: "Tailwind CSS animation utilities including spin, ping, pulse, and bounce effects. Great for learning animation basics.",
    path: "/animation",
    icon: <Sparkles className="w-6 h-6" />,
    tags: ["Tailwind CSS", "Animation"],
  },
  {
    title: "Dashboard Layout",
    description: "Professional dashboard with sidebar navigation and header. Features responsive layout using shadcn/ui components.",
    path: "/dashboard",
    icon: <BarChart3 className="w-6 h-6" />,
    tags: ["Sidebar", "Layout", "Navigation"],
    featured: true,
  },
  {
    title: "Discord Sidebar",
    description: "Discord-inspired sidebar component with channel navigation and user menu. Perfect for communication app UIs.",
    path: "/Discord_sidebar",
    icon: <MessageSquare className="w-6 h-6" />,
    tags: ["Components", "UI Design", "Navigation"],
  },
  {
    title: "Editor-X",
    description: "Advanced text editor implementation with plugin system and rich editing capabilities.",
    path: "/editor-x",
    icon: <Edit3 className="w-6 h-6" />,
    tags: ["Editor", "Plugins", "Complex Components"],
    featured: true,
  },
  {
    title: "Interactive Map",
    description: "Google Map integration showcasing map-based UI components and location features.",
    path: "/map",
    icon: <MapPin className="w-6 h-6" />,
    tags: ["Maps", "Third-party Integration"],
  },
  {
    title: "Map Variant",
    description: "Alternative map implementation with different features and styling.",
    path: "/map2",
    icon: <MapPin className="w-6 h-6" />,
    tags: ["Maps", "UI Variants"],
  },
  {
    title: "Material UI Showcase",
    description: "Material Design components and patterns using Material-UI library.",
    path: "/material_UI",
    icon: <Palette className="w-6 h-6" />,
    tags: ["Material UI", "Design System"],
  },
  {
    title: "Motion Advanced",
    description: "Advanced Framer Motion patterns including expanding search, notification badges, animated drawers, and staggered grids.",
    path: "/motion-advanced",
    icon: <Lightbulb className="w-6 h-6" />,
    tags: ["Framer Motion", "Animation Patterns", "Advanced"],
    featured: true,
  },
  {
    title: "Motion Learning",
    description: "Educational examples of Framer Motion basics. Learn core animation concepts with practical examples.",
    path: "/motion-learning",
    icon: <Layers className="w-6 h-6" />,
    tags: ["Framer Motion", "Learning", "Tutorials"],
  },
  {
    title: "Offer Page",
    description: "E-commerce style offer page with card layouts and product presentation.",
    path: "/Offerpage",
    icon: <ShoppingBag className="w-6 h-6" />,
    tags: ["E-commerce", "Layout", "Cards"],
  },
  {
    title: "Pagination",
    description: "Pagination component implementation with page navigation and data handling.",
    path: "/pagination",
    icon: <ListOrdered className="w-6 h-6" />,
    tags: ["Components", "Data Display"],
  },
  {
    title: "Responsive Chart",
    description: "Data visualization with responsive chart components. Great for dashboards and analytics.",
    path: "/responsive_chart",
    icon: <TrendingUp className="w-6 h-6" />,
    tags: ["Charts", "Data Visualization", "Responsive"],
    featured: true,
  },
  {
    title: "Sidebar Navigation",
    description: "Reusable sidebar navigation component with collapsible menu items.",
    path: "/sidebar",
    icon: <Sidebar className="w-6 h-6" />,
    tags: ["Navigation", "Components", "UI"],
  },
  {
    title: "Sign In",
    description: "Modern authentication UI with gradient design and carousel elements.",
    path: "/SignIn",
    icon: <LogIn className="w-6 h-6" />,
    tags: ["Authentication", "Design", "Forms"],
  },
  {
    title: "Sign In Variant",
    description: "Alternative sign-in page design with different layout and styling approach.",
    path: "/SignIn2",
    icon: <LogIn className="w-6 h-6" />,
    tags: ["Authentication", "UI Design"],
  },
  {
    title: "Test Page",
    description: "Experimental testing page for trying out new components and features.",
    path: "/test",
    icon: <CheckSquare className="w-6 h-6" />,
    tags: ["Testing", "Experimental"],
  },
  {
    title: "TMV-BD Landing Page",
    description: "Full-featured landing page with dark mode toggle, responsive navigation, and product showcase. Production-ready design.",
    path: "/tmv-bd",
    icon: <Grid3x3 className="w-6 h-6" />,
    tags: ["Landing Page", "Dark Mode", "Full Page", "Production"],
    featured: true,
  },
  {
    title: "Toast Notifications",
    description: "Toast notification system implementation for user feedback and alerts.",
    path: "/toast_demo",
    icon: <Bell className="w-6 h-6" />,
    tags: ["Notifications", "UI Feedback"],
  },
];

export default function Showcase() {
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Internship Practice Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A comprehensive collection of frontend projects exploring modern web technologies including React, Next.js, Framer Motion, Tailwind CSS, and more.
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-yellow-500" />
                Featured Projects
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Highlight of key projects showcasing advanced implementations
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredProjects.map((project) => (
                <ProjectCard key={project.path} project={project} variants={itemVariants} />
              ))}
            </motion.div>
          </div>
        )}

        {/* All Projects */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">All Projects</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Complete collection of all practice projects
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {regularProjects.map((project) => (
              <ProjectCard key={project.path} project={project} variants={itemVariants} />
            ))}
          </motion.div>
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-800"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Project Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Projects" value={projects.length} />
            <StatCard label="Featured" value={featuredProjects.length} />
            <StatCard label="Technologies" value="10+" />
            <StatCard label="Component Patterns" value="20+" />
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "shadcn/ui",
                "Material UI",
                "Lucide Icons",
                "Authentication",
                "Responsive Design",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function ProjectCard({
  project,
  variants,
}: {
  project: Project;
  variants: any;
}) {
  return (
    <motion.div variants={variants}>
      <Link href={project.path}>
        <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                {project.icon}
              </div>
              {project.featured && (
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-semibold rounded-full">
                  Featured
                </span>
              )}
            </div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full justify-between group hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              View Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
    >
      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
    </motion.div>
  );
}
