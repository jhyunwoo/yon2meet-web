import DefaultLayout from "@/app/components/default-layout";
import Image from "next/image";
import ImageUploadButton from "@/app/everytime/image-upload-button";
import Link from "next/link";

export default function EveryTimePage() {
  return (
    <DefaultLayout className={"flex flex-col items-center p-4"}>
      <div
        className={
          "w-full max-w-md mx-auto flex flex-col justify-between h-full"
        }
      >
        <div>
          <div className={"text-3xl font-bold mt-8"}>
            에브리타임 시간표
            <br /> 업로드하기
          </div>
          <div
            className={"mx-auto p-8 flex items-center justify-center flex-col"}
          >
            <Image
              src={"/everytime.png"}
              alt={"everytime"}
              width={200}
              height={200}
              className={"mx-auto"}
              priority={true}
            />
            <div
              className={
                "text-xl font-semibold flex items-center justify-center flex-col"
              }
            >
              <div>빠른 시간표 입력을 위해,</div>
              <div>에브리타임 시간표 등록을 지원해요</div>
            </div>
            <div
              className={
                "flex flex-col items-center text-sm text-neutral-700 pt-12"
              }
            >
              <div>에브리타임 시간표 → 톱니바퀴 → 이미지로 저장 후,</div>
              <div>갤러리에서 사진을 업로드해 주세요.</div>
              <div>캡쳐본은 인식이 부정확할 수 있어요.</div>
            </div>
          </div>
        </div>
        <div className={"flex flex-col gap-1 items-center w-full"}>
          <ImageUploadButton />
          <Link
            href={"/everytime/my-schedule"}
            className={"text-sm underline text-neutral-700"}
          >
            현재 시간표 보기
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}
