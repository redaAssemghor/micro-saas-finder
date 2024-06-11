import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/signIn", "/signUp"]);
const isProtectedRoute = createRouteMatcher(["/routeTest"]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
