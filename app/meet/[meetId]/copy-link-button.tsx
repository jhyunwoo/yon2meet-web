"use client";

export default function CopyLinkButton() {
  async function handleCopy() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    alert("링크가 복사되었습니다.");
  }
  return (
    <button
      type={"button"}
      onClick={handleCopy}
      className={"p-1 px-4 rounded-full bg-emerald-500 text-white"}
    >
      링크 복사
    </button>
  );
}
