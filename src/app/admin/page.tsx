import Link from "next/link";
import React, { Suspense } from "react";
import { RecordsTableByDate } from "@/components/recordsTableByDate";
import { DatePicker } from "@/components/datePicker";

const AdminPage = () => {
  const pastSevenDays = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/" className="hover:underline">
        Working Management App
      </Link>

      <Link href="admin/list" className="hover:underline">
        従業員一覧
      </Link>
      <DatePicker />

      {pastSevenDays.map((date, index) => (
        <Suspense key={index}>
          {/* @ts-expect-error Server Component */}
          <RecordsTableByDate selectedDate={date} />
        </Suspense>
      ))}
    </main>
  );
};

export default AdminPage;
