import React, { Suspense } from "react";
import { RecordsTableByDate } from "@/components/recordsTableByDate";
import { convertUtcToTimeZone } from "@/lib/date";

const RecordByDatePage = ({ params }: { params: { date: string } }) => {
  const date = convertUtcToTimeZone(params.date);
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <RecordsTableByDate selectedDate={date} />
      </Suspense>
    </div>
  );
};

export default RecordByDatePage;
