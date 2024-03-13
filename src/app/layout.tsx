import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import UIProvider from "../../providers/UIProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "TRIPSYNC | Your Ultimate Vacation Planner - Plan, Organize, and Enjoy",
  description:
    "Plan and organize unforgettable vacations with TRIPSYNC. Your go-to vacation planner for effortless holiday management, collaboration with participants, and PDF itinerary generation. Explore our features for a seamless and memorable trip!",
  keywords:
    "vacation planner, holiday management, trip organizer, travel planning, itinerary generator, collaborative travel, group vacations, TRIPSYNC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#1BB2B5" },
      }}
    >
      <html lang="en">
        <body className={montserrat.className}>
          <UIProvider>
            <main className="mx-auto flex min-h-screen w-full flex-col 3xl:max-w-7xl">
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </main>
          </UIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
