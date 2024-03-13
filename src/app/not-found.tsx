"use client";

import { RiPagesLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const ErrorPage = () => {
  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center bg-[url('/loading.svg')] bg-cover bg-center bg-no-repeat px-5 py-20 text-white">
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <span className="text-8xl font-black text-white opacity-70">404</span>

        <div className="flex flex-col">
          <h1 className="text-xl font-bold">
            Oops! It seems you&apos;ve stumbled upon a page that doesn&apos;t
            exist.
          </h1>

          <p className="text-sm font-light">
            We apologize for the inconvenience. To return to the homepage,
            please click the button below.
          </p>
        </div>

        <Button
          as={Link}
          href="/"
          variant={"shadow"}
          className="mx-auto w-full max-w-md text-white"
          color="primary"
        >
          Back to the homepage <RiPagesLine size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
