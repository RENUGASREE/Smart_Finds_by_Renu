"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
}

export default function LoadMoreButton({
  onLoadMore,
  hasMore,
  loading,
}: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="mt-12 flex justify-center">
      <Button
        onClick={onLoadMore}
        disabled={loading}
        variant="outline"
        className="h-12 rounded-full px-8 text-sm font-medium"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Load More"
        )}
      </Button>
    </div>
  );
}
