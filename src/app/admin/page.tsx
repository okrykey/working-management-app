import Link from "next/link";
import React, { Suspense } from "react";
import { RecordsTableByDate } from "@/components/recordsTableByDate";
import { DatePicker } from "@/components/datePicker";

const AdminPage = () => {
  const now = new Date();
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/" className="hover:underline">
        Working Management App
      </Link>

      <Link href="admin/list" className="hover:underline">
        従業員一覧
      </Link>

      <Suspense fallback={<p>Loading...</p>}>
        {/* @ts-expect-error Server Component */}
        <RecordsTableByDate selectedDate={now} />
      </Suspense>
      <DatePicker></DatePicker>
    </main>
  );
};

export default AdminPage;
