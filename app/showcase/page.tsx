"use client";

import Link from "next/link";
import {
  Zap,
  Layers,
  BarChart3,
  MessageSquare,
  Edit3,
  MapPin,
  Palette,
  Lightbulb,
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
  Eye,
  X,
  ExternalLink,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

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
    description: "Custom animated button components with various hover effects and transitions.",
    path: "/animated_button_demo",
    icon: <Zap className="w-4 h-4" />,
    tags: ["CSS", "Animation"],
    featured: true,
  },
  {
    title: "Basic Animation",
    description: "Tailwind CSS animation utilities including spin, ping, pulse, and bounce effects.",
    path: "/animation",
    icon: <Sparkles className="w-4 h-4" />,
    tags: ["Tailwind", "Animation"],
  },
  {
    title: "Dashboard Layout",
    description: "Professional dashboard with sidebar navigation and header.",
    path: "/dashboard",
    icon: <BarChart3 className="w-4 h-4" />,
    tags: ["Sidebar", "Layout"],
    featured: true,
  },
  {
    title: "Discord Sidebar",
    description: "Discord-inspired sidebar component with channel navigation.",
    path: "/Discord_sidebar",
    icon: <MessageSquare className="w-4 h-4" />,
    tags: ["UI Design", "Navigation"],
  },
  {
    title: "Editor-X",
    description: "Advanced text editor with plugin system and rich editing capabilities.",
    path: "/editor-x",
    icon: <Edit3 className="w-4 h-4" />,
    tags: ["Editor", "Plugins"],
    featured: true,
  },
  {
    title: "Interactive Map",
    description: "Google Map integration showcasing map-based UI components.",
    path: "/map",
    icon: <MapPin className="w-4 h-4" />,
    tags: ["Maps", "Integration"],
  },
  {
    title: "Map Variant",
    description: "Alternative map implementation with different features and styling.",
    path: "/map2",
    icon: <MapPin className="w-4 h-4" />,
    tags: ["Maps", "Variants"],
  },
  {
    title: "Material UI",
    description: "Material Design components and patterns using Material-UI library.",
    path: "/material_UI",
    icon: <Palette className="w-4 h-4" />,
    tags: ["Material UI"],
  },
  {
    title: "Motion Advanced",
    description: "Advanced Framer Motion patterns: search, badges, drawers, staggered grids.",
    path: "/motion-advanced",
    icon: <Lightbulb className="w-4 h-4" />,
    tags: ["Framer Motion", "Advanced"],
    featured: true,
  },
  {
    title: "Motion Learning",
    description: "Educational Framer Motion basics with practical examples.",
    path: "/motion-learning",
    icon: <Layers className="w-4 h-4" />,
    tags: ["Framer Motion"],
  },
  {
    title: "Offer Page",
    description: "E-commerce style offer page with card layouts.",
    path: "/Offerpage",
    icon: <ShoppingBag className="w-4 h-4" />,
    tags: ["E-commerce", "Cards"],
  },
  {
    title: "Pagination",
    description: "Pagination component with page navigation and data handling.",
    path: "/pagination",
    icon: <ListOrdered className="w-4 h-4" />,
    tags: ["Components"],
  },
  {
    title: "Responsive Chart",
    description: "Data visualization with responsive chart components.",
    path: "/responsive_chart",
    icon: <TrendingUp className="w-4 h-4" />,
    tags: ["Charts", "Data Viz"],
    featured: true,
  },
  {
    title: "Sidebar Nav",
    description: "Reusable sidebar navigation with collapsible menu items.",
    path: "/sidebar",
    icon: <Sidebar className="w-4 h-4" />,
    tags: ["Navigation", "UI"],
  },
  {
    title: "Sign In",
    description: "Modern authentication UI with gradient design.",
    path: "/SignIn",
    icon: <LogIn className="w-4 h-4" />,
    tags: ["Auth", "Forms"],
  },
  {
    title: "Sign In Variant",
    description: "Alternative sign-in page with different layout approach.",
    path: "/SignIn2",
    icon: <LogIn className="w-4 h-4" />,
    tags: ["Auth", "Design"],
  },
  {
    title: "Test Page",
    description: "Experimental page for trying new components and features.",
    path: "/test",
    icon: <CheckSquare className="w-4 h-4" />,
    tags: ["Experimental"],
  },
  {
    title: "TMV-BD Landing",
    description: "Full landing page with dark mode toggle and responsive nav.",
    path: "/tmv-bd",
    icon: <Grid3x3 className="w-4 h-4" />,
    tags: ["Landing Page", "Dark Mode"],
    featured: true,
  },
  {
    title: "Toast Notifications",
    description: "Toast notification system for user feedback and alerts.",
    path: "/toast_demo",
    icon: <Bell className="w-4 h-4" />,
    tags: ["Notifications"],
  },
];

export default function Showcase() {
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  const openModal = useCallback((project: Project) => setModalProject(project), []);
  const closeModal = useCallback(() => setModalProject(null), []);

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4 md:px-6">
      {/* Compact Header */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Internship Projects
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {projects.length} projects · hover to preview · click to open
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            Featured
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            Live preview
          </span>
        </div>
      </motion.div>

      {/* 4-column grid — full width */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.path}
            project={project}
            variants={itemVariants}
            onPreview={openModal}
          />
        ))}
      </motion.div>

      {/* Full-Screen Preview Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
            onClick={closeModal}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-7xl h-[90vh] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal chrome bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center bg-white dark:bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 min-w-[220px]">
                    <span className="truncate">localhost:3000{modalProject.path}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {modalProject.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={modalProject.path} target="_blank">
                    <Button variant="outline" size="sm" className="gap-1 text-xs h-7 px-2.5">
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </Button>
                  </Link>
                  <button
                    onClick={closeModal}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* iframe */}
              <div className="flex-1 relative bg-white">
                <iframe
                  src={modalProject.path}
                  className="w-full h-full border-0"
                  title={`Preview of ${modalProject.title}`}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function ProjectCard({
  project,
  variants,
  onPreview,
}: {
  project: Project;
  variants: any;
  onPreview: (project: Project) => void;
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={variants} className="flex flex-col h-full">
      <div className="h-full flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 group">

        {/* ── Large live preview thumbnail ── */}
        <div
          className="relative w-full overflow-hidden bg-slate-800 flex-shrink-0"
          style={{ height: "260px" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Scaled iframe — fills the full thumbnail area */}
          <div
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              width: "calc(100% / 0.38)",
              height: "calc(100% / 0.38)",
              transform: "scale(0.38)",
              transformOrigin: "top left",
            }}
          >
            <iframe
              src={project.path}
              className="w-full h-full border-0 bg-white"
              title={project.title}
              loading="lazy"
              onLoad={() => setIframeLoaded(true)}
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>

          {/* Shimmer while loading */}
          {!iframeLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
          )}

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-250 ${
              hovered ? "opacity-100 bg-black/50 backdrop-blur-[2px]" : "opacity-0"
            }`}
          >
            <button
              onClick={() => onPreview(project)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 text-xs font-semibold rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Full Preview
            </button>
            <Link href={project.path}>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
                Open
              </span>
            </Link>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-yellow-400/90 text-yellow-900 text-[10px] font-bold rounded shadow">
              ★ Featured
            </span>
          )}
        </div>

        {/* ── Minimal info strip ── */}
        <div className="px-3 py-2.5 flex items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-blue-400 flex-shrink-0">{project.icon}</span>
            <span className="text-sm font-medium text-slate-100 truncate">{project.title}</span>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {project.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded border border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
