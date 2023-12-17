import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteEmployee, updateEmployee } from "@/lib/action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Employee = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  position: string;
};

const EmployeeEditPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const updateEmployeeWithId = updateEmployee.bind(null, id);
  const deleteEmployeeWithId = deleteEmployee.bind(null, id);
  const employee: Employee | null = await prisma.employee.findUnique({
    where: {
      id,
    },
  });

  return (
    <main className="gap-4 p-24 h-screen">
      <div className="text-center font-bold ">従業員情報編集画面</div>
      <form
        className="flex flex-col items-center justify-center gap-8 max-w-xl py-10 m-auto"
        action={updateEmployeeWithId}
      >
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="startTime">名前</Label>
          <Input
            className="w-full"
            type="text"
            id="startTime"
            name="startTime"
            defaultValue={employee?.name}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="endTime">メールアドレス</Label>
          <Input
            className="w-full"
            type="email"
            id="endTime"
            name="endTime"
            defaultValue={employee?.email}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="breakTime">電話番号</Label>
          <Input
            className="w-full"
            type="text"
            id="breakTime"
            name="breakTime"
            defaultValue={employee?.phoneNumber ? employee?.phoneNumber : ""}
          />
        </div>
        <Select
          name="employeePosition"
          required
          defaultValue={employee?.position}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="雇用形態を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>雇用形態</SelectLabel>
              <SelectItem value="アルバイト" id="employeePosition">
                アルバイト
              </SelectItem>
              <SelectItem value="正社員" id="employeePosition">
                社員
              </SelectItem>
              <SelectItem value="契約社員" id="employeePosition">
                契約社員
              </SelectItem>
              <SelectItem value="業務委託" id="employeePosition">
                業務委託
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-row gap-4 justify-center align-middle">
          <Button type="submit">従業員情報を修正する</Button>
          <Link href={`/admin/employee/${id}`}>
            <Button variant="outline">戻る</Button>
          </Link>
        </div>
      </form>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="mx-auto block" variant="outline" type="submit">
            削除
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか?</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消すことができません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <form
              className="flex flex-row justify-center"
              action={deleteEmployeeWithId}
            >
              <AlertDialogAction type="submit">削除</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default EmployeeEditPage;
