"use client";

import React, { useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Editor, EditorCommand, EditorState, RichUtils } from "draft-js";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import Link from "next/link";
const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<Editor | null>(null);

  const handleSubmit = () => {
    console.log(editorState.getCurrentContent());
  };

  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const handleFocusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };
  const toggleInlineStyle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    console.log(style);

    setEditorState(RichUtils.toggleInlineStyle(editorState, style!));
  };
  const handleKeyCommand = (
    command: EditorCommand,
    editorState: EditorState,
    eventTimeStamp: number
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleChange(newState);
      return "handled";
    }

    return "not-handled";
  };
  return (
    <>
      <IconButton
        type="button"
        value="Bold"
        data-style="BOLD"
        onMouseDown={toggleInlineStyle}
      >
        <FormatBoldIcon></FormatBoldIcon>
      </IconButton>
      <IconButton
        type="button"
        value="ITALIC"
        data-style="ITALIC"
        onMouseDown={toggleInlineStyle}
      >
        <FormatItalicIcon></FormatItalicIcon>
      </IconButton>
      <IconButton
        type="button"
        value="UNDERLINE"
        data-style="UNDERLINE"
        onMouseDown={toggleInlineStyle}
      >
        <FormatUnderlinedIcon></FormatUnderlinedIcon>
      </IconButton>
      <IconButton
        type="button"
        value="STRIKETHROUGH"
        data-style="STRIKETHROUGH"
        onMouseDown={toggleInlineStyle}
      >
        <StrikethroughSIcon></StrikethroughSIcon>
      </IconButton>
      <div
        style={{
          minHeight: "20rem",
          border: "1px solid rgba(0,0,0,0.1)",
          padding: "1rem",
        }}
        onClick={handleFocusEditor}
      >
        <Editor
          ref={editorRef}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleSubmit} variant={"contained"}>
        작성하기
      </Button>
      <Button variant={"contained"}>
        <Link href="/">돌아가기</Link>
      </Button>
    </>
  );
};

export default EditorComponent;
