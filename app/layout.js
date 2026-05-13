import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap", /* Prevent FOUT */
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", /* Prevent FOUT */
  preload: true,
});

export const metadata = {
  title: "International Schooling",
  description: "World-class education, anywhere.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <head>
        {/* Preconnect for external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        
        {/* DNS prefetch for YouTube embeds */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://apis.google.com" />
      </head>
      <body className="min-h-full flex flex-col bg-white font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}