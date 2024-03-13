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
} from "@nextui-org/react";
import { ImEnter } from "react-icons/im";

const Header = () => {
  const { isSignedIn } = useUser();

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
            <div className="border-2 border-primary rounded-full">
              <UserButton />
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
