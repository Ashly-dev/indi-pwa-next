import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loggedInStatus = request.cookies.get("loggedIn")?.value;

  // Only redirect if logged in and not on the root path (i.e., landing page)
  if (loggedInStatus === "1" && request.nextUrl.pathname !== "/") {
    const url = request.nextUrl.clone();
    const game = url.searchParams.get("game")?.toLowerCase() || "live";
    const availablePaths: Record<string, string> = {
      home: "home",
      live: "casino",
      slot: "slot",
      indigames: "indigames",
      sports: "sports",
      footballbook: "footballbook",
    };
    const path = availablePaths[game] || "casino";

    return NextResponse.redirect(`https://www.indibet.in/${path}`);
  }

  // If not logged in, allow access to Landing Page normally
  return NextResponse.next();
}
