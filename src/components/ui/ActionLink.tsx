import Link from "next/link";

type ActionLinkProps = {
  href: string; // Destination URL
  label: string; // Text to display
};

export const ActionLink = ({ href, label }: ActionLinkProps) => (
  <Link
    href={href}
    className="flex w-72 h-9 bg-stone-800 rounded text-white cursor-pointer mb-6 justify-center items-center"
  >
    {label}
  </Link>
);
