"use client";

import KakaoLoginButton from "@/app/components/auth/kakao-login-button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LogInOrAddScheduleButton({
  meetId,
}: {
  meetId: string;
}) {
  const { data: session, status } = useSession();
  return (
    <>
      {session ? (
        <Link
          href={`/meet/${meetId}/schedule`}
          className={
            "p-2 text-center bg-emerald-500 text-lg text-white rounded-lg"
          }
        >
          시간표 등록하기
        </Link>
      ) : status === "loading" ? (
        <div
          className={
            "p-2 text-center text-lg rounded-lg bg-emerald-800 text-white"
          }
        >
          Loading...
        </div>
      ) : (
        <KakaoLoginButton />
      )}
    </>
  );
}
