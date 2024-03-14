"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
  Divider,
} from "@nextui-org/react";

import { ImEnter } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { MdMenu } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { TbScriptPlus, TbScript } from "react-icons/tb";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <Navbar
      position="sticky"
      isBlurred={false}
      isBordered
      className="drop-shadow-md"
    >
      <NavbarBrand>
        <Link href="/">
          <Image
            src="/Logo.svg"
            alt="TRIPSYNC"
            width={0}
            height={0}
            style={{ objectFit: "contain" }}
            className="h-auto w-44"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {!isSignedIn ? (
            <Button
              as={Link}
              color="primary"
              href="/sign-in"
              variant="shadow"
              className="text-white"
              endContent={<ImEnter size={25} />}
              radius="sm"
            >
              Log In
            </Button>
          ) : (
            <div className="flex items-center gap-5">
              <div className="rounded-full border-2 transition-all duration-200 ease-in-out hover:border-primary">
                <UserButton />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="light"
                    endContent={<MdMenu size={30} />}
                    radius="sm"
                    isIconOnly
                  />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="mb-5 flex justify-center">
                      <Image
                        src="/Logo.svg"
                        alt="TRIPSYNC"
                        width={0}
                        height={0}
                        style={{ objectFit: "contain" }}
                        className="h-auto w-44"
                      />
                    </SheetTitle>
                    <Divider />
                    <SheetDescription className="w-full">
                      <nav className="mt-5 flex flex-col items-center justify-center gap-3">
                        <Button
                          as={Link}
                          href="/"
                          variant="ghost"
                          className="w-full"
                          endContent={<RiPagesLine size={25} className="opacity-80"/>}
                          radius="sm"
                        >
                          Homepage
                        </Button>

                        <Button
                          as={Link}
                          href="/dashboard"
                          variant="ghost"
                          className="w-full"
                          endContent={<RxDashboard size={25} className="opacity-80"/>}
                          radius="sm"
                        >
                          Dashboard
                        </Button>

                        <Button
                          as={Link}
                          href="/adventure/list"
                          variant="ghost"
                          className="w-full"
                          endContent={<TbScript size={25} className="opacity-80"/>}
                          radius="sm"
                        >
                          My vacation plans
                        </Button>
                        <Button
                          as={Link}
                          href="/adventure/new"
                          variant="ghost"
                          className="w-full"
                          endContent={<TbScriptPlus size={25} className="opacity-80"/>}
                          radius="sm"
                        >
                          Add new vacation plan
                        </Button>
                      </nav>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
