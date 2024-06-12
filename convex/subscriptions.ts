// convex/subscriptions.ts
import { internalMutation, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Internal mutation function to create a newsletter subscription
export const createSubscription = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.insert("subscriptions", {
        email: args.email,
      });
      console.log("Subscription created:", args.email);
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw new ConvexError("Error creating subscription");
    }
  },
});
