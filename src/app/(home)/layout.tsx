import { SidebarProvider } from "@/components/ui/sidebar";
import DocumentsSidebar from "./_components/documents-sidebar";
import { cookies } from "next/headers";

export default async function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen w-full">
        <DocumentsSidebar />
        <div className="flex-1 bg-editor-bg">{children}</div>
      </div>
    </SidebarProvider>
  );
}
