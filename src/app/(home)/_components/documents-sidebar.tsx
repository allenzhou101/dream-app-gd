"use client";

import { useRouter } from "next/navigation";
import { usePaginatedQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { FileText, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function DocumentsSidebar() {
  const router = useRouter();
  const params = useParams();
  const currentDocumentId = params.documentId as string;

  const {
    results: documents,
    loadMore,
    status,
  } = usePaginatedQuery(api.documents.get, {}, { initialNumItems: 10 });

  const createDocument = useMutation(api.documents.create);

  const onNewDocument = () => {
    createDocument({
      title: "Untitled Document",
      initialContent: "",
    })
      .then((id) => {
        toast.success("Document created");
        router.push(`/d/${id}`);
      })
      .catch(() => toast.error("Failed to create document"));
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-semibold">Documents</h2>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onNewDocument}
                  className="w-full justify-start gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Document
                </SidebarMenuButton>
              </SidebarMenuItem>
              {documents === undefined ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : documents.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No documents yet
                </div>
              ) : (
                documents.map((doc) => (
                  <SidebarMenuItem key={doc._id}>
                    <SidebarMenuButton
                      onClick={() => router.push(`/d/${doc._id}`)}
                      className="w-full justify-start gap-2"
                      isActive={doc._id === currentDocumentId}
                    >
                      <FileText className="h-4 w-4" />
                      {doc.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
              {status === "CanLoadMore" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => loadMore(10)}
                    className="w-full justify-start text-sm text-muted-foreground"
                  >
                    Load more...
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
