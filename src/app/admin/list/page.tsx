import { EmployeeTable } from "@/components/employeeTable";
import Link from "next/link";
import React, { Suspense } from "react";

const EmployeeListPage = () => {
  return (
    <div className="p-24 h-screen">
      <div className="flex flex-col items-center justify-center max-w-2xl m-auto">
        <div className="py-4">従業員一覧</div>
        <Link href="/admin/register" className="py-4">
          従業員を追加する
        </Link>
        <Suspense fallback={<p>Loading...</p>}>
          {/* @ts-expect-error Server Component */}
          <EmployeeTable />
        </Suspense>
      </div>
    </div>
  );
};

export default EmployeeListPage;
