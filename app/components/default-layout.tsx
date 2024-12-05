import { ReactNode } from "react";

export default function DefaultLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-screen h-screen pt-14 ${className}`}>{children}</div>
  );
}
