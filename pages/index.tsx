import Image from "next/image";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/hero-section";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
    
      <Header />
      
      <main className="relative flex-grow flex items-center justify-center min-h-screen">
        <HeroSection />
      </main>
      
   
      <Footer />
    </div>
  );
}
