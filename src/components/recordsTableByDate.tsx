import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "./ui/button";
import { formatInTimeZone } from "@/lib/date";

type Employee = {
  id: string;
  name: string;
  email: string;
  position: string;
  isAdmin: boolean;
};

type AttendanceRecord = {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date | null;
  breakTime: number | null;
  employee?: Employee;
  employeeId: string;
};

type ClockInRecordsListProps = {
  selectedDate?: Date;
};

const RecordsTableByDate = async ({
  selectedDate,
}: ClockInRecordsListProps) => {
  const formattedSelectedDate =
    selectedDate && formatInTimeZone(selectedDate, "yyyy-MM-dd");

  const attendanceRecords: AttendanceRecord[] =
    await prisma.attendanceRecord.findMany({
      include: {
        employee: true,
      },
      orderBy: {
        startTime: "desc",
      },
    });

  const filteredRecords = attendanceRecords.filter(
    (record) =>
      formatInTimeZone(record.date, "yyyy-MM-dd") === formattedSelectedDate
  );

  const calculateWorkingHours = (
    startTime: Date,
    endTime: Date | null,
    breakTime?: number | null
  ) => {
    if (!endTime) return "-";

    const start = startTime.getTime();
    const end = endTime.getTime();
    const diffInMinutes = (end - start) / (1000 * 60);

    const totalMinutes = Math.round(diffInMinutes - (breakTime || 0));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`;
  };

  return (
    <div className="w-2/3 pb-4">
      <div>
        <Link
          href={`/admin/records/${
            selectedDate ? formatInTimeZone(selectedDate, "yyyy-MM-dd") : ""
          }`}
        >
          <h2 className="text-lg font-bold text-center hover:underline">
            {selectedDate
              ? formatInTimeZone(selectedDate, "yyyy/MM/dd")
              : "日付が選択されていません"}
            の勤怠記録
          </h2>
        </Link>
      </div>
      {filteredRecords.length > 0 ? (
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 text-center">名前</TableHead>
              <TableHead className="w-1/6 text-center">出勤時間</TableHead>
              <TableHead className="w-1/6 text-center">退勤時間</TableHead>
              <TableHead className="w-1/6 text-center">休憩時間</TableHead>
              <TableHead className="w-1/6 text-center">稼働時間</TableHead>
              <TableHead className="w-1/6 text-center">修正</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {record.employee?.name}
                </TableCell>
                <TableCell>
                  {formatInTimeZone(record.startTime, "H:mm")}
                </TableCell>
                <TableCell>
                  {record.endTime
                    ? formatInTimeZone(record.endTime, "H:mm")
                    : "-"}
                </TableCell>
                <TableCell>
                  {record.breakTime ? `${record.breakTime}分` : "-"}
                </TableCell>
                <TableCell>
                  {calculateWorkingHours(
                    record.startTime,
                    record.endTime,
                    record.breakTime
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/${record.id}/edit`}>
                    <Button size="sm">修正</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="pt-4 text-center text-gray-500">Not found</div>
      )}
    </div>
  );
};

export { RecordsTableByDate };
