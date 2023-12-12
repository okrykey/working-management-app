"use client";

import Head from "next/head";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { onLogin } from "@/lib/action";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function Login() {
  const { toast } = useToast();
  return (
    <div>
      <Head>
        <title>ログイン画面</title>
      </Head>
      <main className="gap-4 p-24 h-screen">
        <div>
          <form
            action={onLogin}
            className="flex flex-col items-center justify-center gap-8 max-w-lg py-10 m-auto"
          >
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="employeeName">メールアドレス</Label>
              <Input
                type="email"
                required
                id="email"
                name="email"
                placeholder="メールアドレス"
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                type="password"
                required
                id="password"
                name="password"
                placeholder="パスワード"
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="passwordConf">パスワード(確認)</Label>
              <Input
                type="password"
                required
                id="passwordConf"
                name="passwordConf"
                placeholder="パスワード(確認)"
              />
            </div>
            <div>
              <Button
                type="submit"
                onSubmit={() => {
                  toast({
                    title: "ログインしました",
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
              >
                ログイン
              </Button>
              <Link href="/" className="py-4">
                <Button variant="link">ホームへ戻る</Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
