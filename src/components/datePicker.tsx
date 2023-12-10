"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const DatePicker = () => {
  const [date, setDate] = React.useState<Date>();

  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <div className="flex flex-row gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "yyyy年M月d日")
            ) : (
              <span>勤怠記録の日付を選択</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {date ? (
        <Link href={`/admin/records/${formattedDate}`}>
          <Button>{`${format(date, "yyyy年M月d日")}の勤怠記録`}</Button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export { DatePicker };
