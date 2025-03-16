import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
    docId: v.optional(v.string()),
    content: v.optional(v.string()),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["ownerId", "organizationId"],
    }),

  users: defineTable({
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    syncStatus: v.optional(v.string()),
    externalId: v.string(),
    verifiedEmail: v.optional(v.boolean()),
    givenName: v.optional(v.string()),
    familyName: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
    phone: v.optional(v.string()),
    verifiedPhone: v.optional(v.boolean()),
  }),
  
});
