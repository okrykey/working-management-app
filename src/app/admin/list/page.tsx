import { EmployeeList } from "@/components/employeeList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";

const EmployeeListPage = () => {
  return (
    <div className="p-24 h-screen">
      <div className="flex flex-col items-center justify-center max-w-2xl m-auto">
        <Link href="/">
          <h1 className="font-bold text-xl underline">
            WORKING MANAGEMENT APP
          </h1>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <h2 className="font-bold ">従業員リスト</h2>
          <Link href="/admin/register" className="py-4">
            <Button size="sm" variant="outline">
              従業員を追加する
            </Button>
          </Link>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <EmployeeList />
        </Suspense>

        <Link href="/admin" className="py-4">
          <Button variant="link">前のページへ戻る</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeListPage;
