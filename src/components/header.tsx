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
          <Button
            color="primary"
            href="#"
            variant="shadow"
            className="text-white"
            endContent={<ImEnter size={25} />}
            radius="sm"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
