import Link from "next/link";
import { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variantClasses = {
  primary: "cta-primary",
  secondary: "cta-secondary",
  ghost: "cta-ghost"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: ButtonLinkProps) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:");

  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (isExternal) {
    return (
      <a
        className={classes}
        href={href}
        rel="noreferrer"
        target={href.startsWith("mailto:") ? undefined : "_blank"}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
