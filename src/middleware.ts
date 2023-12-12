import { NextResponse } from "next/server";
import { type UserRole } from "@/types";
import { clerkClient } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // 認証無しで接続可能なりURL
  publicRoutes: ["/managements(.*)"],

  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      const url = new URL(req.nextUrl.origin);
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    const user = await clerkClient.users.getUser(auth.userId);

    if (!user) {
      throw new Error("User not found.");
    }

    if (!user.privateMetadata.role) {
      await clerkClient.users.updateUserMetadata(auth.userId, {
        privateMetadata: {
          role: "user" satisfies UserRole,
        },
      });
    }
  },
});

export const config = {
  matcher: ["/admin", "/admin/(.*)"],
};
