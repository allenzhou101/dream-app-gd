"use client";

import { useRouter } from "next/navigation";
import { usePaginatedQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
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
import {
  FileText,
  Plus,
  Loader2,
  LogOut,
  ChevronDown,
  MoreVertical,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useDescope, useUser } from "@descope/nextjs-sdk/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export default function DocumentsSidebar() {
  const router = useRouter();
  const params = useParams();
  const currentDocumentId = params.documentId as string;
  const { logout } = useDescope();
  const { user } = useUser();
  const removeDocument = useMutation(api.documents.removeById);

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

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const handleDeleteDocument = async (documentId: Id<"documents">) => {
    try {
      await removeDocument({ id: documentId });
      toast.success("Document deleted");
      if (documentId === currentDocumentId) {
        router.push("/");
      }
    } catch {
      toast.error("Failed to delete document");
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center justify-between px-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer hover:text-accent-foreground">
                <h2 className="text-lg font-semibold">Home</h2>
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>
                {user.name || user.email || "My profile"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                    <div className="flex items-center w-full">
                      <div className="flex-1">
                        <SidebarMenuButton
                          onClick={() => router.push(`/d/${doc._id}`)}
                          className="w-full justify-start gap-2"
                          isActive={doc._id === currentDocumentId}
                        >
                          <FileText className="h-4 w-4" />
                          {doc.title}
                        </SidebarMenuButton>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 hover:bg-accent rounded-md">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDeleteDocument(doc._id)}
                            className="cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
