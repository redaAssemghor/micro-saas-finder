import { internalMutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Internal mutation function to create a user
export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.insert("users", {
        clerkId: args.clerkId,
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      });
      console.log("User inserted:", args.clerkId);
    } catch (error) {
      console.error("Error inserting user:", error);
      throw new ConvexError("Error inserting user");
    }
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    try {
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
        .unique();

      if (!user) {
        throw new ConvexError("User not found");
      }

      await ctx.db.delete(user._id);
      console.log("User deleted:", args.clerkId);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new ConvexError("Error deleting user");
    }
  },
});
