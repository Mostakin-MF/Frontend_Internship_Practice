'use client';

import { useTheme } from '@/app/tmv-bd/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all duration-300 hover:bg-slate-300 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon className="w-6 h-6" />
            ) : (
                <Sun className="w-6 h-6" />
            )}
        </button>
    );
}
