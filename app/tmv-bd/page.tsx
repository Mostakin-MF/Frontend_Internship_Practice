import Footer from "@/components/tmv-bd/Footer";
import Header from "@/components/tmv-bd/Header";
import Navbar from "@/components/tmv-bd/Nabvar";
import Product from "@/components/tmv-bd/Product";
import ProductSection from "@/components/tmv-bd/ProductSection";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "@/components/tmv-bd/ThemeToggle";


function TMVBDPage() {
    return (
        <ThemeProvider>
            <main className="min-h-screen bg-white dark:bg-slate-950 text-foreground transition-colors duration-300">

                <div className="fixed bottom-4 right-4 z-50">
                    <ThemeToggle />
                </div>
                <Navbar />
                <Header />
                <ProductSection />
                <Footer />
            </main>
        </ThemeProvider>
    );
}


export default TMVBDPage;   