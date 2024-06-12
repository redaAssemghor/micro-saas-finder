import type { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

// Ensure the required environment variable is available
function ensureEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

const webhookSecret = ensureEnvironmentVariable("CLERK_WEBHOOK_SECRET");

const handleClerkWebhook = httpAction(async (ctx, request) => {
  console.log("Received webhook request");

  const event = await validateRequest(request);
  if (!event) {
    console.error("Invalid request");
    return new Response("Invalid request", { status: 400 });
  }

  console.log("Received event:", event);

  switch (event.type) {
    case "user.created":
      try {
        await ctx.runMutation(internal.users.createUser, {
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
          imageUrl: event.data.image_url,
          name: event.data.first_name!,
        });
        console.log("User created:", event.data.id);
      } catch (error) {
        console.error("Failed to create user:", error);
        return new Response("Failed to create user", { status: 500 });
      }
      break;

    case "user.deleted":
      try {
        await ctx.runMutation(internal.users.deleteUser, {
          clerkId: event.data.id as string,
        });
        console.log("User deleted:", event.data.id);
      } catch (error) {
        console.error("Failed to delete user:", error);
        return new Response("Failed to delete user", { status: 500 });
      }
      break;

    default:
      console.log("Ignored event type:", event.type);
      break;
  }

  return new Response(null, { status: 200 });
});

const http = httpRouter();
http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

async function validateRequest(
  req: Request
): Promise<WebhookEvent | undefined> {
  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };

  const wh = new Webhook(webhookSecret);
  let event: WebhookEvent | null = null;

  try {
    event = wh.verify(payloadString, svixHeaders) as WebhookEvent;
    console.log("Webhook verified successfully:", event);
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return;
  }

  return event;
}

export default http;
