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
import { recordCheckOut } from "@/lib/action";

export function ClockOutDialog() {
  const { toast } = useToast();
  const today = new Date();
  const dateString = today.toLocaleDateString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">退勤する</Button>
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
              />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="breakTime">休憩時間</Label>
              <Input
                className="w-full"
                type="text"
                id="breakTime"
                name="breakTime"
                placeholder="休憩時間を記入"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={() => {
                  toast({
                    title: "退勤を記録しました",
                    description: `退勤時刻：${dateString}`,
                  });
                }}
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
