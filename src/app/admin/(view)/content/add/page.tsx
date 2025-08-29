"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Editor } from "primereact/editor";
import { EditorTextChangeEvent } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { useCreateContentMutation, useGetContentQuery } from "@/redux/features/admin/dashboard"; // Adjust this path if needed
import { toast } from "sonner";

export default function Page() {
  const searchParams = useSearchParams();
  const contentType = searchParams.get("type");

  // State for the editor's content
  const [text, setText] = useState<string>("");

  // Fetch existing content. The 'skip' option prevents the query from running without a contentType.
  const { data: existingData, isLoading: isFetching } = useGetContentQuery(
    { type: contentType },
    { skip: !contentType }
  );

  // Initialize the mutation hook for updating content
  const [createContent, { isLoading: isUpdating, isSuccess, isError }] =
    useCreateContentMutation();

  // 1. **Populate the editor with fetched data**
  // This effect runs when 'existingData' is successfully fetched or changes.
  useEffect(() => {
    // Check if the API call was successful and data exists
    if (existingData && existingData.success && existingData.data) {
      setText(existingData.data.content || ""); // Set the editor's text to the fetched content
    }
  }, [existingData]); // Dependency array: this effect re-runs only if existingData changes

  // Handle the form submission
  const handleUpdate = async () => {
    if (!contentType) {
      toast.error("Content type is missing from the URL.");
      return;
    }
    if (!text) {
      toast.error("Content cannot be empty.");
      return;
    }

    const payload = {
      content_type: contentType,
      content: text,
    };

    await createContent(payload);
  };

  // Handle success and error feedback for the update mutation
  useEffect(() => {
    if (isSuccess) {
      toast.success("Content updated successfully!");
    }
    if (isError) {
      toast.error("Failed to update content. Please try again.");
    }
  }, [isSuccess, isError]);

  // Optional: Display a loading state while fetching initial content
  if (isFetching) {
    return <div className="p-6">Loading content...</div>;
  }

  return (
    <div className="!pb-12 !pr-6 !space-y-6">
      <h2 className="text-3xl font-bold">
        Manage: {contentType ? contentType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Content"}
      </h2>
      <Editor
        value={text} // Bind value directly to the state
        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue ?? "")}
        style={{ height: "320px" }}
      />
      <Button onClick={handleUpdate} disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Confirm Update"}
      </Button>
    </div>
  );
}