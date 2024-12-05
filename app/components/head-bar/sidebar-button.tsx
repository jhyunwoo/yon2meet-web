"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import {useSidebar} from "@/lib/stores/sidebar";

export default function SidebarButton() {
  const { convert } = useSidebar((state) => state);

  return (
    <button type={"button"} onClick={convert}>
      <Bars3Icon className={"size-8"} />
    </button>
  );
}
