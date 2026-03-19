import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geminox Studio",
  robots: {
    follow: false,
    index: false
  }
};

export default function StudioLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
