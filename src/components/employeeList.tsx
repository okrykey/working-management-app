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
import Link from "next/link";

type Employee = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  position: string;
  isAdmin: boolean;
};

const EmployeeList = async () => {
  const employeeList: Employee[] = await prisma.employee.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <div className="w-full">
      <Table className="text-center">
        <TableCaption>従業員リスト</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 text-center">名前</TableHead>
            <TableHead className="w-1/4 text-center">メールアドレス</TableHead>
            <TableHead className="w-1/4 text-center">電話番号</TableHead>
            <TableHead className="w-1/4 text-center">雇用形態</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeList.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/employee/${employee.id}`}
                  className="hover:underline"
                >
                  {employee.name}
                </Link>
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phoneNumber}</TableCell>
              <TableCell>{employee.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { EmployeeList };
