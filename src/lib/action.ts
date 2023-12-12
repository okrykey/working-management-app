"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { supabase } from "./supabase";
import { z } from "zod";

const schema = z.object({
  employeeName: z.string().max(10),
});

type State =
  | {
      message: string | null;
    }
  | undefined;

export const verifyEmployeeName = async (employeeName: string) => {
  const employee = await prisma.employee.findUnique({
    where: {
      name: employeeName,
    },
  });

  if (!employee) {
    throw new Error("EmployeeName is invalided");
  }
};

export const validateEmployeeName = async (
  prevState: { message: string | null },
  value: string
) => {
  try {
    schema.parse({ EmployeeName: value });
    await verifyEmployeeName(value);
    return { message: null };
  } catch (e) {
    return { message: "※従業員の登録がありません。" };
  }
};

export const recordCheckIn = async (data: FormData) => {
  const employeeName = data.get("employeeName") as string;
  const now = new Date();

  try {
    schema.parse({ employeeName });
    const employee = await prisma.employee.findFirst({
      where: {
        name: employeeName,
      },
    });
    if (employee) {
      await prisma.attendanceRecord.create({
        data: {
          employeeId: employee.id,
          startTime: now,
          endTime: null,
          date: now,
        },
      });
    } else {
      throw new Error("Employee is invalided");
    }
  } catch (error) {
    throw new Error("EmployeeName is invalided");
  }

  revalidatePath("/");
};

export const recordCheckOut = async (data: FormData) => {
  const employeeName = data.get("employeeName") as string;
  const breakTime = parseInt(data.get("breakTime") as string);
  const now = new Date();

  const employee = await prisma.employee.findFirst({
    where: {
      name: employeeName,
    },
  });

  if (employee) {
    const latestRecord = await prisma.attendanceRecord.findFirst({
      where: {
        employeeId: employee.id,
        endTime: null,
      },
      orderBy: {
        startTime: "desc",
      },
    });

    if (latestRecord) {
      await prisma.attendanceRecord.update({
        where: {
          id: latestRecord.id,
        },
        data: {
          endTime: now,
          breakTime: breakTime,
        },
      });

      revalidatePath("/managements");
    } else {
      throw new Error("Active attendance record not found");
    }
  } else {
    throw new Error("Employee not found");
  }
};

export const addEmployee = async (data: FormData) => {
  const name = data.get("employeeName") as string;
  const email = data.get("employeeEmail") as string;
  const phoneNumber = data.get("employeePhoneNumber") as string;
  const position = data.get("employeePosition") as string;

  const employee = await prisma.employee.create({
    data: {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      position: position,
    },
  });
  revalidatePath("/admin");

  if (!employee) {
    throw new Error("Failed to add employee");
  }
  redirect("/admin/list");
};

export const updateRecord = async (id: number, data: FormData) => {
  const startTime = data.get("startTime") as string;
  const endTime = data.get("endTime") as string;
  const breakTime = data.get("breakTime") as string;

  const parsedStartTime = startTime && new Date(startTime);
  const parsedEndTime = endTime ? new Date(endTime) : null;

  const parsedBreakTime = breakTime ? parseInt(breakTime, 10) : null;

  await prisma.attendanceRecord.update({
    where: {
      id,
    },
    data: {
      startTime: parsedStartTime,
      endTime: parsedEndTime,
      breakTime: parsedBreakTime,
    },
  });

  revalidatePath("/admin");
  redirect("/admin");
};

export const deleteRecord = async (id: number) => {
  await prisma.attendanceRecord.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin");
  redirect("/admin");
};

export const onLogin = async (data: FormData) => {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const passwordConf = data.get("passwordConf") as string;

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (password !== passwordConf) {
    alert("パスワードが一致しません");
    return;
  }
  if (signInError) {
    throw signInError;
  }
  redirect("/admin");
};
