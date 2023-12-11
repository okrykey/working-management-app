"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { recordCheckIn } from "@/lib/action";
import { useState } from "react";
import { ToastAction } from "./ui/toast";

export function ClockInDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const today = new Date();
  const dateString = today.toLocaleDateString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleClick = () => {
    if (employeeName) {
      toast({
        title: `出勤を記録しました！\u{1F60E}`,
        description: `出勤時刻：${dateString}`,
      });

      setOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "名前を入力してください",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">出勤する</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={recordCheckIn}>
          <DialogHeader>
            <DialogTitle>出勤登録</DialogTitle>
            <DialogDescription>出勤状態を記入して下さい。</DialogDescription>
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
                placeholder="名前を入力"
                required
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleClick}
              onError={() => {
                toast({
                  variant: "destructive",
                  title: "エラーが発生しました",
                  description: "もう一度試してみて下さい",
                  action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                  ),
                });
                setOpen(false);
              }}
            >
              出勤する
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
