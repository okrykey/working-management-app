import React, { Suspense } from "react";
import { RecordsTableByDate } from "@/components/recordsTableByDate";

const RecordByDatePage = ({ params }: { params: { date: string } }) => {
  const date = new Date(params.date);
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Suspense>
        <RecordsTableByDate selectedDate={date} />
      </Suspense>
    </div>
  );
};

export default RecordByDatePage;
