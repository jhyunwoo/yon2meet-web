import Link from "next/link";
import SidebarButton from "./sidebar-button";

export default function HeadBar() {
  return (
    <div
      className={
        "w-screen fixed top-0 left-0 p-2 bg-neutral-50 flex justify-between z-10"
      }
    >
      <Link
        href={"/"}
        className={"text-xl font-semibold flex gap-2 items-center"}
      >
        <p>yon2meet</p>
      </Link>
      <SidebarButton />
    </div>
  );
}
