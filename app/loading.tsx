import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 flex items-center justify-center"
      }
    >
      <Cog6ToothIcon className={"size-16 text-neutral-500 animate-spin"} />
    </div>
  );
}
