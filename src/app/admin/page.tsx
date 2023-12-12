import Link from "next/link";
import React, { Suspense } from "react";
import { RecordsTableByDate } from "@/components/recordsTableByDate";
import { DatePicker } from "@/components/datePicker";
import { Button } from "@/components/ui/button";

const AdminPage = async () => {
  const pastSevenDays = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/">
        <h1 className="font-bold text-xl underline">WORKING MANAGEMENT APP</h1>
      </Link>

      <Link href="admin/list" className="py-4 hover:underline">
        <Button variant="outline">従業員一覧・登録</Button>
      </Link>
      <p>Check the Date Record</p>
      <DatePicker />
      <p>Last 3 days Records</p>
      {pastSevenDays.map((date, index) => (
        <Suspense key={index}>
          <RecordsTableByDate selectedDate={date} />
        </Suspense>
      ))}
      <Link href="/">
        <Button variant="link">前のページへ戻る</Button>
      </Link>
    </main>
  );
};

export default AdminPage;
