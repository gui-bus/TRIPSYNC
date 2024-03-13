'use client'
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { SiYourtraveldottv } from "react-icons/si";

const HeroSection = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="relative bg-[url('/HeroBanner.svg')] bg-cover bg-center bg-no-repeat py-10 lg:py-20 3xl:rounded-b-2xl">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 p-5 text-center text-white">
        <h1 className="lg:leading-tighter flex-1 text-5xl font-black uppercase tracking-tighter lg:text-7xl">
          Elevate Your Travel Experience
        </h1>
        <p className="max-w-4xl flex-1 font-light">
          Explore the art of seamless vacation planning where every journey
          transforms into an unforgettable masterpiece.
        </p>

        <Button
          variant={"shadow"}
          color="primary"
          size={"lg"}
          as={Link}
          href={`${isSignedIn ? "/dashboard" : "/sign-in"}`}
          className="h-14 w-full uppercase text-white"
          endContent={<SiYourtraveldottv size={25} />}
          radius="sm"
        >
          Kickstart My Travel Adventure
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
