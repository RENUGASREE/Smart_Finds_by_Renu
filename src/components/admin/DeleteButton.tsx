'use client'

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function DeleteButton({ id, deleteAction }: { id: string, deleteAction: (id: string) => Promise<void> }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          startTransition(async () => {
            await deleteAction(id)
          })
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
