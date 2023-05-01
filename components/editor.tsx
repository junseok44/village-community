import React, { useRef, useState } from "react";
import {
  ContentState,
  Editor,
  EditorCommand,
  EditorState,
  RichUtils,
  convertFromHTML,
} from "draft-js";
import {
  MenuItem,
  InputLabel,
  Box,
  Button,
  IconButton,
  Select,
  TextField,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import Link from "next/link";
import { stateToHTML } from "draft-js-export-html";
import { getfullUrl } from "@/lib/getfullUrl";
import Router from "next/router";
import ButtonController from "./shared/ButtonController";

const EditorComponent = ({
  postTitle,
  postBody,
  revisePostId,
}: {
  postTitle?: string;
  postBody?: string;
  revisePostId?: string;
}) => {
  const initialHTML = convertFromHTML(postBody ?? "");
  const [editorState, setEditorState] = useState(
    postBody
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            initialHTML.contentBlocks,
            initialHTML.entityMap
          )
        )
      : EditorState.createEmpty()
  );
  const [title, setTitle] = useState(postTitle ?? "");
  const [category, setCategory] = useState("일반");
  const editorRef = useRef<Editor | null>(null);

  const handleSubmit = () => {
    const html = stateToHTML(editorState.getCurrentContent());

    fetch(getfullUrl("api/post/createpost"), {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: html,
        category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    Router.push("/");
  };
  const handleUpdate = async () => {
    const html = stateToHTML(editorState.getCurrentContent());

    const response = await fetch(getfullUrl("api/post/update"), {
      method: "POST",
      body: JSON.stringify({
        title,
        body: html,
        category,
        id: revisePostId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      Router.back();
    }
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
      <div
        style={{
          minHeight: "3rem",
          border: "1px solid rgba(0,0,0,0.1)",
          marginBottom: "1rem",
        }}
      >
        <TextField
          title="제목"
          placeholder={"제목을 입력하세요"}
          sx={{ width: "100%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
      </div>
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
          // customStyleMap={customStyleMap}
        />
      </div>
      <Box
        alignItems={"center"}
        columnGap={"0.5rem"}
        sx={{ display: "flex", mt: 1 }}
      >
        <Box>
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
        </Box>
        <Box>
          <Select labelId="fontsize-select" label="글자크기 선택" value="16px">
            <MenuItem value={"16px"}>16px</MenuItem>
          </Select>
        </Box>
        <Box justifySelf={"flex-end"}>
          {/* <InputLabel id="category-select">카테고리 선택</InputLabel> */}
          <Select
            labelId="category-select"
            label="ca"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <MenuItem value={"일반"}>일반</MenuItem>
            <MenuItem value={"정보글"}>정보글</MenuItem>
            <MenuItem value={"이벤트"}>이벤트</MenuItem>
          </Select>
        </Box>
      </Box>
      <ButtonController>
        <>
          {postTitle ? (
            <Button onClick={handleUpdate} variant={"text"}>
              수정하기
            </Button>
          ) : (
            <Button onClick={handleSubmit} variant={"text"}>
              작성하기
            </Button>
          )}

          <Link href="/">
            <Button variant={"text"}>돌아가기</Button>
          </Link>
        </>
      </ButtonController>
    </>
  );
};

export default EditorComponent;
