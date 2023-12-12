import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { recordCheckOut, validateEmployeeName } from "@/lib/action";
import { useState } from "react";
import { ToastAction } from "./ui/toast";
import { useFormState } from "react-dom";

const initialState = {
  message: null,
};

export function ClockOutDialog() {
  const { toast } = useToast();
  const [breakTime, setBreakTime] = useState("");
  const [employeeNameValidateState, validateEmployeeNameAction] = useFormState(
    validateEmployeeName,
    initialState
  );
  const today = new Date();
  const dateString = today.toLocaleDateString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="font-bold text-md">
          退勤する
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={recordCheckOut}>
          <DialogHeader>
            <DialogTitle>退勤登録</DialogTitle>
            <DialogDescription>退勤状態を記入して下さい。</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-8 py-8">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="employeeName">
                名前をフルネームで入力して下さい
              </Label>
              <Input
                className="w-full"
                type="text"
                id="employeeName"
                name="employeeName"
                placeholder="名前を記入"
                onBlur={(e) => {
                  validateEmployeeNameAction(e.target.value);
                }}
              />
              {employeeNameValidateState?.message && (
                <p className="text-xs pl-1 text-red-400">
                  {employeeNameValidateState.message}
                </p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="breakTime">休憩時間を入力して下さい</Label>
              <Input
                className="w-full"
                type="number"
                id="breakTime"
                name="breakTime"
                placeholder="休憩時間(分)"
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={() => {
                  toast({
                    title: `退勤を記録しました！\u{1F60E}`,
                    description: `出勤時刻：${dateString}`,
                  });
                }}
                onError={() => {
                  toast({
                    variant: "destructive",
                    title: "エラーが発生しました",
                    description: "もう一度試してみて下さい",
                    action: (
                      <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                  });
                }}
                disabled={
                  employeeNameValidateState.message ===
                  "※従業員の登録がありません。"
                }
              >
                退勤する
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
