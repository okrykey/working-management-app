import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "./ui/button";

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

const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

const RecordsTableByDate = async ({
  selectedDate,
}: ClockInRecordsListProps) => {
  const formattedSelectedDate = selectedDate && formatDate(selectedDate);

  const attendanceRecords: AttendanceRecord[] =
    await prisma.attendanceRecord.findMany({
      include: {
        employee: true,
      },
    });

  const filteredRecords = attendanceRecords.filter(
    (record) => formatDate(record.date) === formattedSelectedDate
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
    <div className="w-2/3">
      <div>
        <h2 className="text-lg font-bold text-center py-4">
          {selectedDate
            ? selectedDate.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
            : "日付が選択されていません"}
          の勤怠記録
        </h2>
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
                  {record.startTime.toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </TableCell>
                <TableCell>
                  {record.endTime
                    ? record.endTime.toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
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
        <p className="text-center text-gray-500">Not found</p>
      )}
    </div>
  );
};

export { RecordsTableByDate };
