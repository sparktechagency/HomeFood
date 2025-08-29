"use client";
import React, { useState, useEffect } from "react";
import { Editor } from "primereact/editor";
import { EditorTextChangeEvent } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { useCreateContentMutation, useGetContentQuery } from "@/redux/features/admin/dashboard";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const contentType = searchParams.get("type");


  const [text, setText] = useState<string>("");


  const { data: existingData, isLoading: isFetching } = useGetContentQuery({
    type: contentType,
  });

  const [createContent, { isLoading: isUpdating, isSuccess, isError }] =
    useCreateContentMutation();


  useEffect(() => {
    if (existingData && existingData.success && existingData.data) {
      setText(existingData.data.content || "");
    }
  }, [existingData]);


  const handleUpdate = async () => {
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


  useEffect(() => {
    if (isSuccess) {
      toast.success("Content updated successfully!");
    }
    if (isError) {
      toast.error("Failed to update content. Please try again.");
    }
  }, [isSuccess, isError]);


  if (isFetching) {
    return <div className="p-6">Loading content...</div>;
  }

  return (
    <div className="!pb-12 !pr-6 !space-y-6">
      <h2 className="text-3xl font-bold">{contentType}</h2>
      <Editor
        value={text}
        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue ?? "")}
        style={{ height: "320px" }}
      />
      <Button onClick={handleUpdate} disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Confirm Update"}
      </Button>
    </div>
  );
}