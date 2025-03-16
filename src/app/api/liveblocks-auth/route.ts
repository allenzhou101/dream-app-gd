import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { session as descopeSession } from "@descope/nextjs-sdk/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const currSession = await descopeSession();

  if (!currSession) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = {
    id: currSession.token.sub as string,
    name: currSession.token.name ? currSession.token.name as string : "",
    email: currSession.token.email,
    avatar: currSession.token.pictureUrl,
  }

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await req.json();
  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    return new Response("Unauthorized", { status: 401 });
  }

  // const isOwner = document.ownerId === user.id;
  // const isOrganizationMember = !!(
  //   document.organizationId && document.organizationId === sessionClaims.org_id
  // );

  // if (!isOwner && !isOrganizationMember) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  const name = user.name ?? user.email ?? "Anonymous";
  const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360
  const color = `hsl(${hue}, 80%, 60%)`;
  
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.avatar as string,
      color,
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
