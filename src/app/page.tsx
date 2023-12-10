import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <div>Working Management App</div>
      <Link href="/managements">
        <p>従業員勤怠管理ページ</p>
      </Link>
      <Link href="/admin">
        <p>管理者ページ</p>
      </Link>
    </main>
  );
}
