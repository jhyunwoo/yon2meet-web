"use client";

import { useRef } from "react";

export default function ImageUploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }

  async function handleImageInput() {
    console.log(inputRef.current?.value);

    if (!inputRef?.current?.files?.[0]) return alert("Please upload a file");

    const formData = new FormData();
    formData.append("file", inputRef?.current?.files?.[0]); // key를 'file'로 설정

    try {
      const response = await fetch("http://43.203.114.201:8080/image", {
        body: formData,
        method: "POST",
      });
      const result = await response.json();

      console.log("Upload success:", result);
    } catch (error) {
      console.error("Upload error:", error);
    }
  }

  return (
    <>
      <input
        hidden={true}
        type={"file"}
        accept={"image/*"}
        ref={inputRef}
        onChange={handleImageInput}
      />
      <button
        onClick={handleClick}
        type={"button"}
        className={
          "p-3 text-lg font-semibold rounded-lg bg-emerald-600 text-white"
        }
      >
        사진 보관함에서 시간표 업로드
      </button>
    </>
  );
}
