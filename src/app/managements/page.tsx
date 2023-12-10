"use client";
import React from "react";
import { ClockInDialog } from "@/components/clockInDialog";
import { ClockOutDialog } from "@/components/clockOutDialog";
import Link from "next/link";

const ManagementsPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/">Working Management App</Link>
      <p>従業員勤怠管理ページ</p>
      <div className="flex flex-row gap-4">
        <ClockInDialog />

        <ClockOutDialog />
      </div>
    </main>
  );
};

export default ManagementsPage;
