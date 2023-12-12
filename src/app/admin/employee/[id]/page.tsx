import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React from "react";

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

type RecordsGroupedByMonth = {
  [key: string]: AttendanceRecord[];
};

const EmployeeDetailPage = async ({ params }: { params: { id: string } }) => {
  const records = await prisma.attendanceRecord.findMany({
    where: { employeeId: params.id },
  });
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
  });

  const groupByMonth = (records: AttendanceRecord[]) => {
    const grouped: RecordsGroupedByMonth = {};
    records.forEach((record) => {
      const month = record.date.getMonth();
      const year = record.date.getFullYear();
      const key = `${year}-${month + 1}`;

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(record);
    });
    return grouped;
  };

  const groupedRecords = groupByMonth(records);

  const calculateMonthlyStats = (groupedRecords: RecordsGroupedByMonth) => {
    return Object.keys(groupedRecords).map((month) => {
      const records = groupedRecords[month];
      const totalWorkingMinutes = calculateWorkingTotalHours(records);
      const totalWorkingTime = convertMinutesToHours(totalWorkingMinutes);
      const totalWorkDays = calculateWorkDays(records);

      const [year, monthNumber] = month.split("-");
      const formattedMonth = `${year}年${parseInt(monthNumber)}`;

      return {
        month: formattedMonth,
        totalWorkingTime,
        totalWorkDays,
      };
    });
  };

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
  const calculateWorkingTotalHours = (records: AttendanceRecord[]) => {
    return records.reduce((totalHours, record) => {
      if (record.startTime && record.endTime) {
        const start = record.startTime.getTime();
        const end = record.endTime.getTime();
        const diffInMinutes = (end - start) / (1000 * 60);
        const workingMinutes = diffInMinutes - (record.breakTime || 0);
        return totalHours + workingMinutes;
      }
      return totalHours;
    }, 0);
  };

  const convertMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const decimal = (remainingMinutes / 60).toFixed(1);
    return `${hours + parseFloat(decimal)}時間`;
  };
  const calculateWorkDays = (records: AttendanceRecord[]) => {
    return records.length;
  };

  const monthlyStats = calculateMonthlyStats(groupedRecords);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-xl font-bold mb-4">{employee?.name}さんの勤怠記録</h1>
      {monthlyStats.map((stat) => (
        <div
          key={stat.month}
          className="w-full max-w-xl  shadow-sm border border-gray-800 rounded-lg p-4 mb-4"
        >
          <h2 className="text-lg font-semibold">{stat.month}月の稼働記録</h2>
          <p className="text-md">総稼働時間: {stat.totalWorkingTime}</p>
          <p className="text-md">勤務日数: {stat.totalWorkDays}</p>
        </div>
      ))}

      <Table className="text-center">
        <TableCaption>
          <Link href={`/admin/employee/${params.id}/edit`}>
            <Button variant="outline">修正する</Button>
          </Link>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 text-center">名前</TableHead>
            <TableHead className="w-1/4 text-center">メールアドレス</TableHead>
            <TableHead className="w-1/4 text-center">電話番号</TableHead>
            <TableHead className="w-1/4 text-center">雇用形態</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{employee.name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.phoneNumber}</TableCell>
            <TableCell>{employee.position}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="w-2/3">
        <Table className="text-center">
          <TableCaption>直近の出退勤リスト</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 text-center">日付</TableHead>
              <TableHead className="w-1/5 text-center">出勤時間</TableHead>
              <TableHead className="w-1/5 text-center">退勤時間</TableHead>
              <TableHead className="w-1/5 text-center">休憩時間</TableHead>
              <TableHead className="w-1/5 text-center">稼働時間</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record: AttendanceRecord) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {record.date.toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
