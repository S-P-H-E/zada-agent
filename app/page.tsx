import Link from "next/link";

export default function Home() {

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center text-5xl gap-5">
      Big man ting, this is the home page
      <Link href="/565656" className="underline text-blue-500">
      Try click this for a sample bot
      </Link>
    </div>
  )
}
