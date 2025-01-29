/**
 * API Route Handler Configuration for Vercel Edge Runtime using Hono
 */

// External imports
import { handle } from "hono/vercel";

// Internal imports
// Note: Import from dist is necessary for Vercel deployment
// @ts-ignore
import app from "../dist/src/app.js";

// Configure Vercel Edge Runtime
export const runtime = "edge";

/**
 * HTTP Method Handlers
 * Export handlers for all standard HTTP methods using Hono's handle function
 */
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const HEAD = handle(app);
export const OPTIONS = handle(app);
