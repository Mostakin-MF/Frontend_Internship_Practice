import Footer from "@/components/tmv-bd/Footer";
import Header from "@/components/tmv-bd/Header";
import Navbar from "@/components/tmv-bd/Navbar";
import Product from "@/components/tmv-bd/Product";
import ProductSection from "@/components/tmv-bd/ProductSection";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "@/components/tmv-bd/ThemeToggle";
import PlatformInfo from "@/components/tmv-bd/platformInfo";


function TMVBDPage() {
    return (
        <ThemeProvider>
            <main className="min-h-screen bg-white dark:bg-slate-950 text-foreground transition-colors duration-300">

                <div className="fixed bottom-4 right-4 z-50">
                    <ThemeToggle />
                </div>
                <div className="relative">
                    <div className="absolute top-0 left-0 right-0 z-50">
                        <Navbar />
                    </div>
                    <Header />
                </div>
                <ProductSection />
                <PlatformInfo />
                <Footer />
            </main>
        </ThemeProvider>
    );
}


export default TMVBDPage;   