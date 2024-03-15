/**
 * Header Component
 *
 * This component displays the top navigation bar of the site, including the TRIPSYNC logo and a dropdown menu for navigation and login/logout actions.
 *
 * Features:
 * - Displays the TRIPSYNC logo.
 * - If the user is not logged in, it shows a dropdown menu with limited navigation options, allowing access to the 'homepage' and 'view public plans' pages, and providing a login option.
 * - If the user is logged in, the menu displays their name/email and options to navigate to the 'dashboard', 'my vacation plans', and 'add vacation plan' pages, as well as a logout button instead of the login button.
 */

"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Image,
  Divider,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { RxDashboard } from "react-icons/rx";
import { MdPublic } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { TbScriptPlus, TbScript } from "react-icons/tb";

import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Navbar
      position="sticky"
      isBlurred={false}
      isBordered
      className="w-full drop-shadow-md"
    >
      <div className="mx-auto flex w-full max-w-xs items-center sm:max-w-md lg:max-w-7xl">
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
          {isSignedIn ? (
            <Dropdown placement="bottom">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={user?.firstName || ""}
                  size="sm"
                  src={user?.imageUrl}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="shadow"
                color="secondary"
                disabledKeys={["user-info", "divider"]}
              >
                <DropdownItem className="h-14 gap-2" key="user-info">
                  <p className="font-semibold">{user?.fullName}</p>
                  <p className="text-xs font-semibold">
                    {String(user?.primaryEmailAddress)}
                  </p>
                </DropdownItem>
                <DropdownItem
                  startContent={<RiPagesLine />}
                  onClick={() => router.push("/")}
                  color="primary"
                >
                  Homepage
                </DropdownItem>

                <DropdownItem
                  startContent={<MdPublic />}
                  onClick={() => router.push("/adventure/public")}
                  color="primary"
                >
                  View Public Plans
                </DropdownItem>

                <DropdownItem key="divider">
                  <Divider />
                </DropdownItem>

                <DropdownItem
                  startContent={<RxDashboard />}
                  onClick={() => router.push("/dashboard")}
                  color="primary"
                >
                  Dashboard
                </DropdownItem>

                <DropdownItem
                  startContent={<TbScript />}
                  onClick={() => router.push("/adventure/list")}
                  color="primary"
                >
                  My Vacations Plans
                </DropdownItem>

                <DropdownItem
                  startContent={<TbScriptPlus />}
                  onClick={() => router.push("/adventure/new")}
                  color="primary"
                >
                  Add Vacation Plan
                </DropdownItem>

                <DropdownItem key="divider">
                  <Divider />
                </DropdownItem>

                <DropdownItem
                  startContent={<LuLogOut />}
                  key="logout"
                  color="danger"
                  onClick={() => signOut(() => router.push("/"))}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Dropdown placement="bottom">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name=""
                  size="sm"
                  src=""
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="shadow"
                color="secondary"
                disabledKeys={["divider"]}
              >
                <DropdownItem
                  startContent={<RiPagesLine />}
                  onClick={() => router.push("/")}
                  color="primary"
                >
                  Homepage
                </DropdownItem>

                <DropdownItem
                  startContent={<MdPublic />}
                  onClick={() => router.push("/adventure/public")}
                  color="primary"
                >
                  View Public Plans
                </DropdownItem>

                <DropdownItem key="divider">
                  <Divider />
                </DropdownItem>

                <DropdownItem
                  startContent={<LuLogOut />}
                  onClick={() => router.push("/sign-in")}
                  color="primary"
                >
                  Log In
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default Header;
