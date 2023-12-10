import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateRecord } from "@/lib/action";

import Link from "next/link";
import React from "react";

const formatDateTime = (date?: Date | null) => {
  if (!date) return "";
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  let hours = "" + d.getHours();
  let minutes = "" + d.getMinutes();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const RecordEditPage = async ({ params }: { params: { recordId: string } }) => {
  const id = Number(params.recordId);
  const updateRecordWithId = updateRecord.bind(null, id);
  const records = await prisma.attendanceRecord.findUnique({
    where: {
      id,
    },
  });
  return (
    <main className="gap-4 p-24 h-screen">
      <div className="text-center">従業員登録画面</div>
      <Link href="/admin">戻る</Link>
      <form
        className="flex flex-col items-center justify-center gap-8 max-w-xl py-10 m-auto"
        action={updateRecordWithId}
      >
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="startTime">出勤時間</Label>
          <Input
            className="w-full"
            type="datetime-local"
            id="startTime"
            name="startTime"
            defaultValue={formatDateTime(records?.startTime)}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="endTime">退勤時間</Label>
          <Input
            className="w-full"
            type="datetime-local"
            id="endTime"
            name="endTime"
            defaultValue={formatDateTime(records?.endTime)}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="breakTime">休憩時間</Label>
          <Input
            className="w-full"
            type="text"
            id="breakTime"
            name="breakTime"
            defaultValue={
              records?.breakTime !== null ? records?.breakTime.toString() : ""
            }
          />
        </div>
        <Button type="submit">出退勤を修正する</Button>
      </form>
    </main>
  );
};

export default RecordEditPage;
