import { AttendanceRecordsTable } from "@/components/attendanceRecordsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <div>Working Management App</div>
      <Link href="/managements" className="hover:underline">
        <Button variant="ghost">出退勤の登録はこちら！</Button>
      </Link>
      <Link href="/admin">
        <Button variant="link">管理者ページ</Button>
      </Link>

      <Suspense fallback={<p>Loading...</p>}>
        {/* @ts-expect-error Server Component */}
        <AttendanceRecordsTable />
      </Suspense>
    </main>
  );
}
