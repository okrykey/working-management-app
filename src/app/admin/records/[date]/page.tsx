import React, { Suspense } from "react";
import { RecordsTableByDate } from "@/components/recordsTableByDate";
import { convertUtcToTimeZone } from "@/lib/date";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const RecordByDatePage = ({ params }: { params: { date: string } }) => {
  const date = convertUtcToTimeZone(params.date);
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <RecordsTableByDate selectedDate={date} />
      </Suspense>
      <Link href="/admin">
        <Button variant="link">前のページへ戻る</Button>
      </Link>
    </div>
  );
};

export default RecordByDatePage;
