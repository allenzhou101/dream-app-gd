"use client";

import { useMutation, usePaginatedQuery } from "convex/react";
import { useEffect, useRef } from "react";

// import { Navbar } from "./navbar";
// import { TemplatesGallery } from "./templates-gallery";
// import { DocumentsTable } from "./documents-table";

import { api } from "../../../convex/_generated/api";
import { useSearchParam } from "@/hooks/use-search-param";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const hasAttemptedCreate = useRef(false);

  const [search] = useSearchParam();

  const { results, status } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );

  const create = useMutation(api.documents.create);

  useEffect(() => {
    const createGettingStartedDoc = async () => {
      if (hasAttemptedCreate.current) return;

      // Check if a getting started document already exists
      const hasGettingStarted = results?.some(
        (doc) => doc.title === "Getting Started"
      );
      if (!hasGettingStarted) {
        hasAttemptedCreate.current = true;
        await create({
          title: "Getting started",
          initialContent: "👋 Welcome to Dream!",
        });
      }
    };
    if (results && results.length > 0) {
      router.push(`/d/${results[0]._id}`);
    } else if (results && results.length === 0) {
      createGettingStartedDoc();
    }
    // if no documents, create one with getting started
  }, [create, results, router]);

  // Show loading state while redirecting
  if (status === "LoadingFirstPage") {
    return <div>Loading...</div>;
  }

  // Return null since we're redirecting
  return null;

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
