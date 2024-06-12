import type { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { httpAction } from "./_generated/server";
import { createUser } from "./users"; // Import the mutation function

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
  console.log("Webhook received");

  const event = await validateRequest(request);
  if (!event) {
    console.error("Invalid request");
    return new Response("Invalid request", { status: 400 });
  }

  console.log("Received event:", event);

  if (event.type === "user.created") {
    console.log("User created event data:", event.data);
    const userData = event.data;

    try {
      await ctx.runMutation({
        name: "createUser",
        args: {
          clerkId: userData.id,
          name: userData.first_name,
          email: userData.email_addresses[0].email_address,
          imageUrl: userData.image_url || "",
        },
      });
      console.log("User creation mutation called successfully");
    } catch (error) {
      console.error("Error calling createUser mutation:", error);
    }
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

  console.log("Headers:", headerPayload);
  console.log("Payload:", payloadString);

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };

  const wh = new Webhook(webhookSecret);
  let event: WebhookEvent | null = null;

  try {
    event = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return;
  }

  return event;
}

export default http;
