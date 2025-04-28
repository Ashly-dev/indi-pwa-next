import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loggedInStatus = request.cookies.get("loggedIn")?.value;

  if (loggedInStatus === "1") {
    const url = request.nextUrl.clone();

    // Default redirect path based on your login logic
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
