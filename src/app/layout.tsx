import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import UIProvider from "../../providers/UIProvider";

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
    <html lang="en">
      <body className={montserrat.className}>
        <UIProvider>
          <main className="mx-auto w-full 3xl:max-w-7xl">{children}</main>
        </UIProvider>
      </body>
    </html>
  );
}
