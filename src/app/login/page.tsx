"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = (event.target as HTMLFormElement).password.value;

    const result = await signIn("credentials", {
      redirect: false,
      password,
    });

    if (!result?.error) {
      router.push("/admin");
    } else {
      console.error(result?.error);
    }
  };

  return (
    <main className="gap-4 p-24 h-screen">
      <div className="text-center font-bold ">ログイン</div>
      <form
        className="flex flex-col items-center justify-center gap-8 max-w-xl py-10 m-auto"
        onSubmit={handleSignIn}
      >
        <div className="grid w-1/2 items-center gap-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex flex-row gap-4 justify-center align-middle">
          <Button type="submit">ログイン</Button>
          <Link href="/">
            <Button variant="outline">戻る</Button>
          </Link>
        </div>
      </form>
    </main>
  );
}
