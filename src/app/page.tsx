import { AttendanceRecordsTable } from "@/components/attendanceRecordsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/">
        <h1 className="font-bold text-xl underline">WORKING MANAGEMENT APP</h1>
      </Link>
      <div className="flex flex-row gap-4 py-4">
        <Link href="/managements" className="hover:underline">
          <Button variant="outline" className="font-bold">
            出退勤の登録
          </Button>
        </Link>
        <Link href="/admin" className="hover:underline">
          <Button variant="outline" className="font-bold">
            管理者ページ
          </Button>
        </Link>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <AttendanceRecordsTable />
      </Suspense>
    </main>
  );
}
