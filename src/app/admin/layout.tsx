"use client";
import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
    };

    checkSession();
  }, [router]);

  return <>{children}</>;
};

export default Layout;
