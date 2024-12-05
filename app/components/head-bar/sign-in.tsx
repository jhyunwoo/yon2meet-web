import KakaoLoginButton from "@/app/components/auth/kakao-login-button";
import Link from "next/link";

export default function SingIn() {
  return (
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
      <div className={"pb-16"}>
        <KakaoLoginButton />
      </div>
    </div>
  );
}
