import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";

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

const AttendanceRecordsTable = async () => {
  const attendanceRecords: AttendanceRecord[] =
    await prisma.attendanceRecord.findMany({
      include: {
        employee: true,
      },
      orderBy: {
        date: "desc",
      },
      take: 10,
    });
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
      <Table className="text-center">
        <TableCaption>直近の出退勤リスト</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6 text-center">名前</TableHead>
            <TableHead className="w-1/6 text-center">日付</TableHead>
            <TableHead className="w-1/6 text-center">出勤時間</TableHead>
            <TableHead className="w-1/6 text-center">退勤時間</TableHead>
            <TableHead className="w-1/6 text-center">休憩時間</TableHead>
            <TableHead className="w-1/6 text-center">稼働時間</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">
                {record.employee?.name}
              </TableCell>
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
  );
};

export { AttendanceRecordsTable };
