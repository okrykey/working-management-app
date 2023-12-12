"use client";
import React from "react";
import { ClockInDialog } from "@/components/clockInDialog";
import { ClockOutDialog } from "@/components/clockOutDialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ManagementsPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/">
        <h1 className="font-bold text-xl underline">WORKING MANAGEMENT APP</h1>
      </Link>
      <h2 className="font-bold">従業員勤怠管理ページ</h2>

      <div className="flex flex-row gap-4 py-4">
        <ClockInDialog />
        <ClockOutDialog />
      </div>
      <Link href="/">
        <Button variant="link">前のページへ戻る</Button>
      </Link>
    </main>
  );
};

export default ManagementsPage;
