"use client";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useSidebar } from "@/lib/stores/sidebar";
import UserProfile from "@/app/components/head-bar/user-profile";
import SignIn from "@/app/components/head-bar/sign-in";

export default function Sidebar() {
  const { isOpen, close } = useSidebar((state) => state);
  const { data: session } = useSession();

  return (
    <div
      className={`fixed top-0 z-10 p-4 left-0 w-screen bottom-0 flex bg-neutral-100 h-screen ${!isOpen ? "-translate-y-full" : "translate-y-0"} transition-all`}
    >
      <div className={"w-full mx-auto max-w-md relative"}>
        {session ? <UserProfile /> : <SignIn />}
        <button
          type={"button"}
          onClick={close}
          className={"absolute bottom-6 right-6"}
        >
          <ChevronUpIcon className={"size-8"} />
        </button>
      </div>
    </div>
  );
}
