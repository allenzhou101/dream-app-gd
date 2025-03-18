import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { api, internal } from "./_generated/api";

export enum SyncStatus {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export const sync = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }

    const email = identity.email;

    if (!email) {
      throw new Error("No email found in identity");
    }
    const user = await ctx.runQuery(api.users.get);

    if (!user) {
      throw new Error("User not found");
    }

    if (
      user.syncStatus === SyncStatus.IN_PROGRESS ||
      user.syncStatus === SyncStatus.COMPLETED
    ) {
      return;
    }
    await ctx.runMutation(internal.users.updateSyncStatus, {
      syncStatus: SyncStatus.IN_PROGRESS,
      _id: user._id,
    });
  },
});

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthenticated call to mutation");
    }
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("externalId"), identity.subject))
      .first();
  },
});

export const updateSyncStatus = internalMutation({
  args: {
    _id: v.id("users"),
    syncStatus: v.optional(v.string()),
  },
  handler: async (ctx, { syncStatus, _id }) => {
    const existingUser = await ctx.db.get(_id);

    if (existingUser) {
      await ctx.db.patch(existingUser._id, { syncStatus });
    } else {
      await ctx.runMutation(api.users.store);
    }

    return { success: true };
  },
});

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("externalId"), identity.subject))
      .unique();
    if (user !== null) {
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    const newUserId = await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      email: identity.email,
      // verifiedEmail: identity.verifiedEmail,
      givenName: identity.givenName,
      familyName: identity.familyName,
      pictureUrl: identity.pictureUrl,
      externalId: identity.subject,
      // phone: identity.phone,
      // verifiedPhone: identity.verifiedPhone,
    });
    
    await ctx.runMutation(api.documents.create, {
      title: "Getting started",
      initialContent: "👋 Welcome to Dream!",
    })

    return newUserId
  },
});

export const listAll = internalQuery({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserFromEmail = internalQuery({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();
  },
}); 