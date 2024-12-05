"use client";

import Link from "next/link";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import useMeets from "@/lib/hooks/use-meets";
import { useSidebar } from "@/lib/stores/sidebar";

export default function UserProfile() {
  const { data: session } = useSession();
  const { meetsData } = useMeets(1, 5);
  const { close } = useSidebar((state) => state);

  return (
    <div className={"flex flex-col h-full w-full justify-between"}>
      <Link
        href={"/"}
        onClick={close}
        className={"text-lg flex gap-2 items-center"}
      >
        <p>yon2meet</p>
      </Link>
      <div
        className={
          "p-2 px-3 rounded-lg bg-neutral-200/50 ring-2 ring-neutral-400 flex flex-col gap-2 mt-4"
        }
      >
        <div className={"flex items-center justify-between"}>
          <div className={"flex items-center gap-1"}>
            <ChatBubbleOvalLeftIcon className={"size-4 text-yellow-400"} />
            <div>{session?.user?.name}</div>
          </div>
          <button
            type={"button"}
            onClick={() => signOut()}
            className={"text-sm text-neutral-600 underline"}
          >
            로그아웃
          </button>
        </div>
        <Link
          href="/everytime"
          className={
            "bg-emerald-500 w-full rounded-lg p-2 text-white text-center"
          }
          onClick={close}
        >
          에브리타임 시간표 등록하기
        </Link>
      </div>
      <div className={"flex flex-col h-full  justify-end"}>
        <div className={"text-lg font-semibold px-2"}>최근 약속 목록</div>
        <div className={"flex flex-col gap-2 overflow-auto p-2 pb-16"}>
          {meetsData?.map((data, i) => (
            <Link
              href={`/meet/${data.id}`}
              key={i}
              className={
                "w-full p-2 px-3 min-h-20 rounded-xl ring-2 ring-neutral-700 bg-white"
              }
              onClick={close}
            >
              <div className={"text-lg"}>{data.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
