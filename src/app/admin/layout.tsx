import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

/* @ts-expect-error Server Component */
const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default Layout;
