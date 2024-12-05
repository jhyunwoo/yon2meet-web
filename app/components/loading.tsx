"use client";

import { useLoading } from "@/lib/stores/loading";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  const { isLoading } = useLoading((state) => state);
  return (
    <>
      {isLoading ? (
        <div
          className={
            "w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-neutral-300/50"
          }
        >
          <Cog6ToothIcon className={"size-16 animate-spin text-neutral-600"} />
        </div>
      ) : null}
    </>
  );
}
