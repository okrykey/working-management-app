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
  id: number;
  name: string;
  email: string;
  position: string;
  isAdmin: boolean;
};

const EmployeeTable = async () => {
  const employeeList: Employee[] = await prisma.employee.findMany();
  return (
    <div className="w-full">
      <Table className="text-center">
        <TableCaption>従業員リスト</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 text-center">名前</TableHead>
            <TableHead className="w-1/3 text-center">メールアドレス</TableHead>
            <TableHead className="w-1/3 text-center">雇用形態</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeList.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { EmployeeTable };
