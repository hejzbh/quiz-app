import React from "react";
// Next
import dynamic from "next/dynamic";
import { navLinks } from "@/utils/links";
import Link from "next/link";
// Components
const Container = dynamic(() => import("@/components/Container"));

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full">
      <Container className="my-0 flex items-center justify-center py-1 space-x-5">
        {navLinks?.map((link) => (
          <Link
            key={link.href}
            title={`Go to ${link.name}`}
            href={link?.href}
            className="text-lg font-semibold text-[white] underline"
          >
            {link.name}
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default Header;
