import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/trips*", "/itinerary*", "/discover", "/api*"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};
 
export default withClerkMiddleware((req: NextRequest) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(req);

  if (!userId) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
});
 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
}