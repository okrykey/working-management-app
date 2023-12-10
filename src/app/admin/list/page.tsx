import { EmployeeList } from "@/components/employeeList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";

const EmployeeListPage = () => {
  return (
    <div className="p-24 h-screen">
      <div className="flex flex-col items-center justify-center max-w-2xl m-auto">
        <div className="py-4">従業員一覧</div>
        <Suspense fallback={<p>Loading...</p>}>
          {/* @ts-expect-error Server Component */}
          <EmployeeList />
        </Suspense>
        <Link href="/admin/register" className="py-4">
          <Button>従業員を追加する</Button>
        </Link>
        <Link href="/admin" className="py-4">
          <Button variant="ghost">前のページへ戻る</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeListPage;
