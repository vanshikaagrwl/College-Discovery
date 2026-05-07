import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";
import NotificationContainer from "@/components/NotificationContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "College Discovery",
  description: "Search, compare, and evaluate colleges with course, fee, ranking, and admission predictor guidance.",
  icons: {
    icon: "/images/logo-horizontal.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-50 antialiased transition-colors duration-200">
        <NotificationProvider>
          <ThemeProvider>
            <FavoritesProvider>
              <NavBar />
              <NotificationContainer />
              {children}
            </FavoritesProvider>
          </ThemeProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
