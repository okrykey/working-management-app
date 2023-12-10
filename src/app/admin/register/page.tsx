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
import React from "react";

const RegisterPage = () => {
  const { toast } = useToast();

  return (
    <main className="gap-4 p-24 h-screen">
      <div className="text-center">従業員登録画面</div>
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
          />
        </div>

        <Select name="employeePosition">
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
            });
          }}
        >
          従業員を登録する
        </Button>
      </form>
    </main>
  );
};

export default RegisterPage;
