"use client";

import { useSidebar } from "@/lib/stores/sidebar";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import KakaoLoginButton from "@/app/components/auth/kakao-login-button";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ScheduleType } from "@/db/schema";

export default function Sidebar() {
  const { isOpen, close } = useSidebar((state) => state);
  const { data: session } = useSession();

  const [meets, setMeets] = useState<
    {
      meets: {
        id: string;
        title: string;
        startDate: string;
        endDate: string;
        absolutelyNot: ScheduleType[];
        adjustable: ScheduleType[];
      };
    }[]
  >([]);

  useEffect(() => {
    async function getMeets() {
      const meetData = await fetch("/api/user/meets").then((res) => res.json());
      setMeets(meetData);
    }
    getMeets();
  }, []);

  return (
    <div
      className={`fixed top-0 z-10 p-4 left-0 w-screen bottom-0 bg-neutral-100 h-screen ${!isOpen ? "-translate-y-full" : "translate-y-0"} transition-all`}
    >
      {session ? (
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
                <div>{session.user?.name}</div>
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
              href="/"
              className={
                "bg-emerald-500 w-full rounded-lg p-2 text-white text-center"
              }
            >
              시간표 등록하기
            </Link>
          </div>
          <div className={"flex flex-col h-full  justify-end"}>
            <div className={"text-lg font-semibold px-2"}>약속 목록</div>
            <div className={"flex flex-col gap-2 overflow-auto p-2 h-[70vh]"}>
              {meets.map((data, i) => (
                <Link
                  href={`/meet/${data.meets.id}`}
                  key={i}
                  className={
                    "w-full p-2 px-3 min-h-20 rounded-xl ring-2 ring-neutral-700 bg-white"
                  }
                  onClick={close}
                >
                  <div className={"text-lg"}>{data.meets.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={"flex flex-col h-full w-full"}>
          <Link
            href={"/"}
            onClick={close}
            className={"text-lg flex gap-2 items-center"}
          >
            <p>yon2meet</p>
          </Link>
          <div className={"text-3xl font-bold py-8 h-full"}>
            <div>로그인하여 정보 저장,</div>
            <div>입력을 편리하게</div>
          </div>
          <div className={"pb-12"}>
            <KakaoLoginButton />
          </div>
        </div>
      )}
      <button
        type={"button"}
        onClick={close}
        className={"absolute bottom-6 right-6"}
      >
        <ChevronUpIcon className={"size-8"} />
      </button>
    </div>
  );
}
