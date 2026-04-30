"use client";

import { HeroUIDemo } from "@/components/HeroUIDemo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Frontend Internship Practice Repository
          </p>
          <Link href="/showcase">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="mt-16">
          <HeroUIDemo />
        </div>
      </div>
    </main>
  );
}
