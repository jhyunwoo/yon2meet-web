import { ReactNode } from "react";

export default function Banner({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        "p-4 py-8 bg-sky-800 text-white flex items-center justify-between"
      }
    >
      {children}
    </div>
  );
}
