"use client";

import { useMutation, usePaginatedQuery } from "convex/react";
import { useEffect } from "react";

// import { Navbar } from "./navbar";
// import { TemplatesGallery } from "./templates-gallery";
// import { DocumentsTable } from "./documents-table";

import { api } from "../../../convex/_generated/api";
import { useSearchParam } from "@/hooks/use-search-param";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Home = () => {
  const router = useRouter();

  const [search] = useSearchParam();
  const create = useMutation(api.documents.create);

  const { results, status } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );

  useEffect(() => {
    if (results && results.length > 0) {
      router.push(`/d/${results[0]._id}`);
    }
    // if no documents, create one with getting started
  }, [results, router]);

  // Show loading state while redirecting
  if (status === "LoadingFirstPage") {
    return <div>Loading...</div>;
  }

  // Return null since we're redirecting
  return (
    <>
      <SidebarTrigger />
      Create a document:
      <Button
        onClick={async () => {
          await create({});
        }}
      >
        Create
      </Button>{" "}
    </>
  );

  // return (
  //   <div className="min-h-screen flex flex-col">
  //     <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
  //       <Navbar />
  //     </div>
  //     <div className="mt-16">
  //       <TemplatesGallery />
  //       <DocumentsTable
  //         documents={results}
  //         loadMore={loadMore}
  //         status={status}
  //       />
  //     </div>
  //   </div>
  // );
};

export default Home;
