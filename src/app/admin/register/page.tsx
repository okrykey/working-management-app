"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { addEmployee } from "@/lib/action";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const { toast } = useToast();
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");

  const isFormValid = () => {
    return (
      employeeName && employeeEmail && employeePhoneNumber && employeePosition
    );
  };

  return (
    <main className="gap-4 p-24 h-screen">
      <div className="text-center font-bold">従業員登録画面</div>
      <form
        className="flex flex-col items-center justify-center gap-8 max-w-xl py-10 m-auto"
        action={addEmployee}
      >
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="employeeName">従業員名を記入</Label>
          <Input
            className="w-full"
            type="text"
            id="employeeName"
            name="employeeName"
            placeholder="名前を記入"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="employeeName">従業員メールアドレスを記入</Label>
          <Input
            className="w-full"
            type="email"
            id="employeeEmail"
            name="employeeEmail"
            placeholder="メールアドレスを記入"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="employeeName">従業員の電話番号を記入</Label>
          <Input
            className="w-full"
            type="text"
            id="employeePhoneNumber"
            name="employeePhoneNumber"
            placeholder="電話番号を記入"
            value={employeePhoneNumber}
            onChange={(e) => setEmployeePhoneNumber(e.target.value)}
            required
          />
        </div>

        <Select
          name="employeePosition"
          required
          onValueChange={(value) => {
            setEmployeePosition(value);
          }}
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
        <Button
          type="submit"
          onClick={() => {
            toast({
              title: "従業員を登録しました",
              description: `${employeeName}さんを従業員${employeePosition}として登録しました。`,
              action: (
                <ToastAction altText="Add more">
                  <Link href="/admin/register">Add more </Link>
                </ToastAction>
              ),
            });
          }}
          onError={() => {
            toast({
              variant: "destructive",
              title: "エラーが発生しました",
              description: "もう一度試してみて下さい",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
          disabled={!isFormValid()}
        >
          従業員を登録する
        </Button>
        <Link href="/admin/list">
          <Button variant="link">前のページへ戻る</Button>
        </Link>
      </form>
    </main>
  );
};

export default RegisterPage;
