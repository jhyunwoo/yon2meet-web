import Link from "next/link";
import SidebarButton from "./sidebar-button";

export default function HeadBar() {
  return (
    <div
      className={
        "w-screen fixed top-0 left-0 p-2 px-4 bg-neutral-50 flex justify-center z-10"
      }
    >
      <div className={"w-full max-w-md mx-auto flex justify-between"}>
        <Link
          href={"/"}
          className={"text-xl font-semibold flex gap-2 items-center"}
        >
          <p>yon2meet</p>
        </Link>
        <SidebarButton />
      </div>
    </div>
  );
}
