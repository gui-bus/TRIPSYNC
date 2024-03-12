import React, { ReactNode } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaChevronRight, FaSitemap } from "react-icons/fa6";
import { Link } from "@nextui-org/react";
import { Button } from "./ui/button";

type ButtonSize = "sm" | "lg" | "default" | "icon" | null | undefined;

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  size?: ButtonSize;
}

function SocialLink({ href, icon, size }: SocialLinkProps) {
  return (
    <Button size={size} variant={"outline"} asChild>
      <Link href={href} isExternal className="p-2 text-black">
        {icon}
      </Link>
    </Button>
  );
}

interface FooterLinkProps {
  text: string;
}

function FooterLink({ text }: FooterLinkProps) {
  return (
    <p className="group flex cursor-pointer items-center justify-center gap-1">
      <span
        className="hidden text-primary group-hover:block group-hover:animate-spin"
        style={{ animationIterationCount: 1, animationDuration: "0.3s" }}
      >
        <FaChevronRight size={12} />
      </span>
      {text}
    </p>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    "Vacation Destinations",
    "Travel Guides",
    "Accommodations",
    "Travel Tips",
  ];

  const aboutUs = [
    "About TRIPSYNC",
    "Terms and Conditions",
    "Privacy Policy",
    "Contact Us",
  ];

  const resources = [
    "Blog",
    "Support Center",
    "Customer Reviews",
    "Affiliate Program",
  ];

  return (
    <footer className="mx-auto w-full cursor-default items-center justify-center border-t border-input bg-white pt-8 shadow-xl md:px-0 3xl:max-w-7xl">
      <section className="flex flex-col items-center justify-around gap-y-4 px-4 pb-8 shadow-xl md:flex-row md:gap-y-0">
        <Link href="/">
          <Image
            src="/Icon.svg"
            alt="TRIPSYNC ICON"
            width={0}
            height={0}
            style={{ objectFit: "contain" }}
            className="h-auto w-16"
          />
        </Link>

        <p className="text-sm">
          &copy; {currentYear} TRIPSYNC - All Rights Reserved.
        </p>

        <div className="flex gap-1">
          <SocialLink
            href="https://guibus.vercel.app/"
            icon={<FaSitemap size={20} />}
            size="icon"
          />
          <SocialLink
            href="https://www.linkedin.com/in/gui-bus"
            icon={<FaLinkedinIn size={20} />}
            size="icon"
          />
          <SocialLink
            href="https://github.com/gui-bus"
            icon={<FaGithub size={20} />}
            size="icon"
          />
        </div>
      </section>

      <div className="bg-zinc-200/60 px-4 py-6">
        <section className="mx-auto flex flex-col items-center justify-center gap-3 text-center text-xs md:flex-row">
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-base font-medium uppercase">Categories</h3>
            {categories.map((category, index) => (
              <FooterLink key={index} text={category} />
            ))}
          </div>

          <div className="flex w-full flex-col gap-1">
            <h3 className="text-base font-medium uppercase">About Us</h3>
            {aboutUs.map((about, index) => (
              <FooterLink key={index} text={about} />
            ))}
          </div>

          <div className="flex w-full flex-col gap-1">
            <h3 className="text-base font-medium uppercase">Resources</h3>
            {resources.map((resource, index) => (
              <FooterLink key={index} text={resource} />
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
}
