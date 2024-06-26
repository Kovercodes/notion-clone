"use client";
import { useTheme } from "next-themes";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";

import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent: string | undefined;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
        file
    });

    return response.url;
  }

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editable={editable}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2));
        }}
      />
    </div>
  );
};

export default Editor;