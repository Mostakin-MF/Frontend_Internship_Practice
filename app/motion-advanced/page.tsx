"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  ArrowRight
} from "lucide-react";

/**
 * ============================================================================
 * MORE ADVANCED REUSABLE ANIMATION PATTERNS
 * ============================================================================
 * 
 * This page focuses on more complex, often-used UI patterns in modern web apps:
 * 1. Animated Search Bar (Expanding input)
 * 2. Notification Badge (Popping/wiggling on new data)
 * 3. Mac-style Dock / Tooltip Hover Menu (Shared layout transitions)
 * 4. Animated Drawer / Sidebar (Sliding off-canvas menus)
 * 5. Staggered Grid Cards (Entrance animations for dashboard widgets)
 */

// --- 1. Expanding Search Bar ---
/**
 * USAGE: 
 * Great for navbars where space is tight. 
 * Animates the width of the input field when focused.
 */
function ExpandingSearch() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      // Animate width seamlessly
      animate={{ width: isFocused ? 280 : 200 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative flex items-center rounded-full border transition-colors ${
        isFocused ? "border-blue-500 bg-white" : "border-gray-200 bg-gray-50"
      }`}
    >
      <Search className="absolute left-3 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full py-2 pl-10 pr-4 text-sm bg-transparent outline-none rounded-full"
      />
      {/* Small subtle animation for the clear button (or just a shortcut indicator mapping) */}
      <AnimatePresence>
        {!isFocused && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-3 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200"
          >
            ⌘K
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- 2. Notification Badge Wiggle ---
/**
 * USAGE: 
 * Used when a user receives a new notification. 
 * It briefly jiggles the bell icon and scales up the red dot.
 */
function NotificationBadge() {
  const [count, setCount] = useState(2);

  const triggerNotification = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={triggerNotification}
        className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors font-medium"
      >
        Simulate Notification
      </button>

      <div className="relative p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
        {/* The Bell icon wiggles slightly when count changes */}
        <motion.div
           key={count} // Changing the key forces Framer Motion to re-run the `animate` prop
           animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
           transition={{ duration: 0.4 }}
        >
          <Bell className="w-6 h-6 text-gray-700" />
        </motion.div>

        {/* The badge pops in */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              key={count} // Re-animate bump when count changes
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }} // Scale bump effect
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white px-1"
            >
              {count > 9 ? "9+" : count}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- 3. Fluid Hover Menu (Mac style) ---
/**
 * USAGE: 
 * A sleek navigation menu where a background highlight follows the cursor.
 * Similar to the AnimatedTabs pattern, but usually used for main navigation headers.
 */
function FluidNavMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navItems = ["Products", "Solutions", "Resources", "Pricing"];

  return (
    <nav className="flex space-x-1 p-2 bg-white border border-gray-100 rounded-2xl shadow-sm w-fit">
      {navItems.map((item, index) => (
        <a
          key={item}
          href="#"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative px-4 py-2 text-sm font-medium text-gray-700 rounded-xl transition-colors hover:text-gray-900"
        >
          {hoveredIndex === index && (
             <motion.div
               layoutId="nav-hover-bg"
               className="absolute inset-0 bg-gray-100/80 rounded-xl"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
             />
          )}
          <span className="relative z-10">{item}</span>
        </a>
      ))}
    </nav>
  );
}

// --- 4. Off-Canvas Drawer (Sidebar) ---
/**
 * USAGE: 
 * Used for mobile menus, shopping carts, or detail panels.
 * Slides in from the right. Uses a backdrop just like the Modal.
 */
function AnimatedDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
      >
        <Menu className="w-4 h-4" /> Open Drawer
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />

            {/* Sliding Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }} // Start off-screen right
              animate={{ x: 0 }}      // Slide in
              exit={{ x: "100%" }}    // Slide out
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold">Settings Panel</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  This drawer animates its `translateX` value (x: "100%"). 
                  Because it's rendering over the rest of the app, we use fixed positioning.
                </p>
                
                {/* Dummy content */}
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center px-4">
                       <div className="w-8 h-8 rounded-full bg-gray-200 mr-3" />
                       <div className="flex-1">
                         <div className="h-3 w-24 bg-gray-200 rounded-full mb-2" />
                         <div className="h-2 w-32 bg-gray-100 rounded-full" />
                       </div>
                     </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium text-sm">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- 5. Staggered Grid Cards (Dashboard Entrance) ---
/**
 * USAGE: 
 * Used when a dashboard loads to make the initial data presentation feel premium.
 */
function DashboardGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, // Very fast stagger feels snappy
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },   // Slight scale down
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };

  const cards = [
    { title: "Total Revenue", value: "$45,231.89", trend: "+20.1%" },
    { title: "Subscriptions", value: "+2350", trend: "+180.1%" },
    { title: "Active Users", value: "+12,234", trend: "+19%" },
    { title: "Bounce Rate", value: "24.3%", trend: "-2.4%" },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
    >
      {cards.map((card, idx) => (
        <motion.div 
          key={idx}
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }} // Float effect on hover
          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-sm font-medium text-gray-500">{card.title}</h4>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors group-hover:translate-x-1 duration-300" />
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{card.value}</h2>
            <span className={`text-xs font-semibold ${card.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
              {card.trend}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// --- MAIN PAGE ---

export default function MotionAdvancedPage() {
  return (
    <div className="min-h-screen pb-20 pt-12 px-6 bg-gray-50 flex flex-col items-center gap-16 font-sans">
      
      <div className="text-center max-w-2xl mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-purple-600 uppercase bg-purple-100 rounded-full"
        >
          Advanced Motion Patterns
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight"
        >
          Level Up Your Components
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-500 leading-relaxed"
        >
          More complex, production-ready interactive patterns typically found in modern SaaS dashboards and web applications.
        </motion.p>
      </div>

      <div className="w-full max-w-5xl space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Expanding Search */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
            <div className="w-full flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">1. Expanding Search</h3>
              <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-400 bg-gray-100 rounded uppercase">Layout / Width</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Animates the input width to save space in tight navbars.</p>
            <div className="w-full flex items-center justify-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
              <ExpandingSearch />
            </div>
          </div>

          {/* Notification Badge */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
            <div className="w-full flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">2. Notification Badge</h3>
              <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-400 bg-gray-100 rounded uppercase">Keyframes / Mount</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Wiggles the bell and scales the badge using <code>key</code> props to force re-animation.</p>
            <div className="w-full flex items-center justify-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
              <NotificationBadge />
            </div>
          </div>

          {/* Fluid Nav Menu */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 lg:col-span-2">
            <div className="w-full flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">3. Fluid Nav Menu</h3>
              <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-purple-500 bg-purple-50 rounded uppercase">LayoutId</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Uses <code>layoutId</code> to smoothly slide a background pill behind hovered navigation links.</p>
            <div className="w-full flex justify-center py-6">
              <FluidNavMenu />
            </div>
          </div>

          {/* Sliding Drawer */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
            <div className="w-full flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">4. Sliding Drawer</h3>
              <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-blue-500 bg-blue-50 rounded uppercase">Transform X</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">An off-canvas sidebar menu that slides in from the right edge of the screen.</p>
            <div className="w-full h-full min-h-[120px] flex justify-center items-center">
              <AnimatedDrawer />
            </div>
          </div>

          {/* Staggered Grid */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
            <div className="w-full flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">5. Dashboard Grid Start</h3>
              <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-emerald-500 bg-emerald-50 rounded uppercase">Orchestration</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Uses very fast stagger sequencing and a slight scale entrance for a snappy dashboard load effect.</p>
            <div className="w-full">
              <DashboardGrid />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
