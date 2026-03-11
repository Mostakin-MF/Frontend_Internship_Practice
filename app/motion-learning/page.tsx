"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ChevronDown, X, Info } from "lucide-react";

/**
 * ============================================================================
 * FRAMER MOTION REAL-WORLD PATTERNS & GUIDELINES
 * ============================================================================
 * 
 * CORE PRINCIPLES FOR REUSABILITY:
 * 1. Keep variations simple: prefer `duration` and `ease` for standard UI elements.
 *    Use `type: "spring"` for things that should feel physical (modals, dragging).
 * 2. Unmount safely: Always wrap conditionally rendered components in `<AnimatePresence>`
 *    if they need an `exit` animation. Use `animate={{ opacity: 1 }}` and `exit={{ opacity: 0 }}`.
 * 3. Extract variants: If an animation gets complex, move it outside the component body
 *    into a `variants` object to keep the JSX clean.
 * 4. Use `layout` sparingly: The `layout` prop is powerful but expensive. Only use it
 *    when elements actually change size or position dynamically.
 *    See `layoutId` below for sharing layout animations between entirely different components.
 * 
 * PERFORMANCE TIPS:
 * - Animate `transform` (scale, x, y, rotate) and `opacity` whenever possible, 
 *   as these do not trigger expensive browser layout recalculations.
 * - Avoid animating `width`, `height`, `top`, `left`, etc., unless absolutely necessary 
 *   (like in the Accordion example below).
 */

// --- REUSABLE COMPONENTS FOR REAL-LIFE SYSTEMS ---

/**
 * 1. Animated Tabs (Using layoutId)
 * ----------------------------------------------------------------------------
 * USAGE GUIDELINE: 
 * Perfect for navigation menus or switching views (e.g., Settings panels).
 * The `layoutId` prop is the secret here. It tells Framer Motion that the background
 * highlight `motion.div` is the "same" element across different tabs, so it automatically
 * animates its size and position between them.
 */
function AnimatedTabs() {
  const tabs = ["Overview", "Integrations", "Settings"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex space-x-1 bg-gray-100/80 p-1.5 rounded-xl w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative px-4 py-2 text-sm font-medium rounded-lg outline-none transition-colors ${
            activeTab === tab ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="active-tab" // <-- The magic that links the highlight across tabs
              className="absolute inset-0 bg-white shadow-sm rounded-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * 2. Accordion / Expandable Section (Using AnimatePresence & Height: Auto)
 * ----------------------------------------------------------------------------
 * USAGE GUIDELINE: 
 * Use for FAQs, collapsible sidebars, or showing/hiding details.
 * Animating to `height: auto` is natively difficult in CSS but trivial in Framer.
 * 
 * IMPORTANT: You MUST use `overflow: hidden` on the animating `<motion.div>` 
 * so that content doesn't spill out while the height is squishing down to 0.
 */
function Accordion({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-5 py-4 bg-white hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {/* Rotate icon based on state */}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      
      {/* AnimatePresence allows us to animate the component OUT when it is removed */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            // height "auto" handles dynamic content automatically
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden" // Critical for clean height animations
          >
            <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 3. Animated Dialog / Modal
 * ----------------------------------------------------------------------------
 * USAGE GUIDELINE: 
 * Ideal for confirmation dialogs, alerts, or complex forms that need focus.
 * 
 * PRO TIP: In a real app, wrap this component in a React Portal (e.g., using 
 * ReactDOM.createPortal) so it mounts at the root of your HTML `<body>` to avoid 
 * tricky `z-index` and `overflow` issues from parent containers.
 */
function AnimatedModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-md hover:-translate-y-0.5 active:translate-y-0 duration-200"
      >
        Open Dialog
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop: Animates opacity to fade in/out */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal Body: Animates opacity AND scales up with a bouncy spring effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 overflow-hidden border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 mt-2">Delete Item</h3>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                Are you sure you want to delete this permanently? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-medium text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm text-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * 4. Toast Notification (Slide-in overlays)
 * ----------------------------------------------------------------------------
 * USAGE GUIDELINE: 
 * Use for non-intrusive feedback (e.g., "Saved successfully").
 * 
 * PRO TIP: Notice how the element is absolutely/fixed positioned. This means we 
 * can animate `y` safely without causing reflows. The `exit` prop smoothly removes 
 * it when the timer runs out.
 */
function AnimatedToast() {
  const [isVisible, setIsVisible] = useState(false);

  const showToast = () => {
    setIsVisible(true);
    // Auto-dismiss after 4 seconds
    setTimeout(() => setIsVisible(false), 4000);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={showToast}
        className="px-6 py-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-medium hover:bg-blue-100 transition-colors shadow-sm"
      >
        Trigger Toast
      </button>

      {/* Renders the toast conditionally, but animates the entrance/exit */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }} // Starts off-screen downwards
            animate={{ opacity: 1, y: 0, scale: 1 }}    // Slides up into its natural position
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-8 right-8 flex items-start gap-4 bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl z-[100] min-w-[320px]"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm">Deployment Successful</p>
              <p className="text-sm text-gray-400 mt-1">Your changes are now live.</p>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-300 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 5. Skeleton Loading State (Infinite keyframes)
 * ----------------------------------------------------------------------------
 * USAGE GUIDELINE: 
 * Replace generic spinners with skeletons that match the shape of your pending data.
 * 
 * HOW IT WORKS: 
 * We pass an array `[0.4, 0.8, 0.4]` into opacity. Framer Motion will automatically 
 * interpolate these as keyframes over the `duration`. By setting `repeat: Infinity`, 
 * we get a looping pulse effect. We also stagger the `delay` slightly on the inner 
 * blocks for a nice cascading/wave effect.
 */
function SkeletonLoadingList() {
  return (
    <div className="w-full space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm w-full flex gap-4">
          {/* Avatar Skeleton */}
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-12 h-12 bg-gray-200 rounded-full shrink-0"
          />
          <div className="flex-1 py-1 space-y-3">
            {/* Title Skeleton */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.1 }}
              className="h-3.5 bg-gray-200 rounded-full w-3/4"
            />
            {/* Subtitle Skeleton */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="h-3 bg-gray-200 rounded-full w-1/2"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- MAIN LEARNING PAGE ---

export default function MotionLearningPage() {
  /**
   * VARIANTS EXAMPLE (For The Staggered List)
   * Variants let you define states (like 'hidden' and 'visible') completely separate
   * from the JSX. This is especially useful for orchestrating child animations.
   * `staggerChildren` means each child component will appear 0.1s after the previous one.
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pb-20 pt-12 px-6 bg-gray-50 flex flex-col items-center gap-16 font-sans">
      
      {/* Header section with entrance animation */}
      <div className="text-center max-w-2xl mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full"
        >
          Framer Motion Guide
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight"
        >
          Bring Your UI to Life
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-500 leading-relaxed"
        >
          Explore these production-ready components. They are modular, reusable, and heavily commented so you know exactly how they work.
        </motion.p>
      </div>

      <div className="w-full max-w-5xl space-y-16">
        
        {/* SECTION 1: Real-World Reusable Components */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4 text-gray-900">
            <h2 className="text-2xl font-bold">Real-World UI Patterns</h2>
            <div className="group relative flex items-center justify-center">
              <Info className="w-5 h-5 text-gray-400 cursor-help" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                Review the source code of this file for detailed implementation constraints and tips.
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <h3 className="text-lg font-semibold text-gray-800">1. Animated Tabs</h3>
              <p className="text-sm text-gray-500 mb-4">Uses <code>layoutId</code> to smoothly slide the active background indicator between tabs.</p>
              <div className="w-full flex justify-center py-4">
                <AnimatedTabs />
              </div>
            </div>

            {/* Accordion Example */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <h3 className="text-lg font-semibold text-gray-800">2. Accordion / Disclosure</h3>
              <p className="text-sm text-gray-500 mb-4">Uses <code>AnimatePresence</code> to smoothly animate height from 0 to auto naturally.</p>
              <div className="w-full">
                <Accordion 
                  title="How does Framer Motion work?" 
                  content="It uses an optimized animation loop and integrates tightly with React's render cycle, enabling smooth animations without complex CSS transitions. Check the comments above the Accordion code block for how we handle `overflow: hidden` safely."
                />
                <Accordion 
                  title="Is it good for performance?" 
                  content="Yes! It can animate transform and opacity values entirely outside of the main React render cycle via hardware acceleration."
                />
              </div>
            </div>

            {/* Modal Example */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <h3 className="text-lg font-semibold text-gray-800">3. Dialog / Modal</h3>
              <p className="text-sm text-gray-500 mb-4">Combines an animating backdrop blur, scale spring physics, and mounting/unmounting transitions.</p>
              <div className="w-full h-full flex items-center justify-center min-h-[140px]">
                <AnimatedModal />
              </div>
            </div>

            {/* Toast Example */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
              <h3 className="text-lg font-semibold text-gray-800">4. Toast Notification</h3>
              <p className="text-sm text-gray-500 mb-4">Slides in from the edge with overshooting spring mechanics. Easily dismissed with an exit animation.</p>
              <div className="w-full h-full flex items-center justify-center min-h-[140px]">
                <AnimatedToast />
              </div>
            </div>

            {/* Skeleton Example */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800">5. Skeleton Status (Loading)</h3>
              <p className="text-sm text-gray-500 mb-4">An infinitely repeating opacity pulse used for indicating data fetches, built with simple keyframes arrays.</p>
              <div className="w-full max-w-lg mx-auto py-4">
                <SkeletonLoadingList />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: The Basics */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4 text-gray-900">
             <h2 className="text-2xl font-bold">The Essentials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Essential 1: Hover & Tap */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4">
              <h3 className="font-semibold text-center text-gray-800">Hover & Tap</h3>
              <p className="text-xs text-gray-500 text-center mb-2">Built-in micro interactions.</p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium shadow-md shadow-indigo-200 cursor-pointer"
              >
                Hover Me
              </motion.button>
            </div>

            {/* Essential 2: Keyframes */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4">
              <h3 className="font-semibold text-center text-gray-800">Keyframes</h3>
              <p className="text-xs text-gray-500 text-center mb-2">Provide an array of values.</p>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1.2, 1, 1],
                  rotate: [0, 0, 90, 90, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                className="w-16 h-16 bg-gradient-to-tr from-fuchsia-500 to-purple-600 shadow-lg shadow-purple-200"
              />
            </div>

            {/* Essential 3: Staggered list */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-start">
              <h3 className="font-semibold text-center mb-1 text-gray-800">Variants</h3>
              <p className="text-xs text-gray-500 text-center mb-4">Sequence animations automatically.</p>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col gap-2 w-full"
              >
                {[1, 2, 3].map((item) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    className="bg-gray-50 px-3 py-2 rounded-lg text-gray-600 text-sm font-medium border border-gray-100"
                  >
                    List Item {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
