// components/ui/NavigationIconLink.tsx

import Link from "next/link";
import Image from "next/image";

type NavigationIconLinkProps = {
  href: string; // URL to navigate to
};

export const NavigationIconLink = ({ href }: NavigationIconLinkProps) => (
  <Link className="mb-2" href={href}>
    <Image width={15} height={15} src="/leftArrow.svg" alt="leftArrow" />
  </Link>
);
