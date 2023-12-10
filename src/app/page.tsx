import { AttendanceRecordsTable } from "@/components/attendanceRecordsTable";
import Link from "next/link";
import { Suspense } from "react";

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
      <div>直近の出退勤リスト</div>
      <Suspense fallback={<p>Loading...</p>}>
        {/* @ts-expect-error Server Component */}
        <AttendanceRecordsTable />
      </Suspense>
    </main>
  );
}
