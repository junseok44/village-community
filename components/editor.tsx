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
import sanitizeHTML from "sanitize-html";
import { SelectChangeEvent } from "@mui/material/Select";

const EditorComponent = ({
  postTitle,
  postBody,
  revisePostId,
  villageId,
  villageCategories,
}: {
  postTitle?: string;
  postBody?: string;
  revisePostId?: string;
  villageId: string;
  villageCategories: string[];
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
  const [category, setCategory] = useState(villageCategories[0]);
  const [errMsg, setErrMsg] = useState("");
  const [fontSize, setFontSize] = useState(10);
  const editorRef = useRef<Editor | null>(null);

  const customStyleMap = {
    SET_FONT_SIZE: {
      fontSize: `${fontSize}px`,
    },
  };

  const handleSubmit = async () => {
    if (errMsg) setErrMsg("");
    const html = stateToHTML(editorState.getCurrentContent());
    if (!title.trim()) return setErrMsg("제목을 반드시 작성해야 합니다.");
    const sanitizedHTML = sanitizeHTML(html, { allowedTags: [] });
    if (!sanitizedHTML.trim()) return setErrMsg("내용을 입력하세요");

    const response = await fetch(getfullUrl("api/post/create"), {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: html,
        category,
        villageId,
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
  const handleChangeTextSize = (event: SelectChangeEvent<number>) => {
    customStyleMap.SET_FONT_SIZE = {
      fontSize: `${event.target.value}px`,
    };
    setFontSize(event.target.value as number);
    setEditorState(RichUtils.toggleInlineStyle(editorState, "SET_FONT_SIZE"));
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
          height: "20rem",
          overflow: "auto",
          border: "1px solid rgba(0,0,0,0.1)",
          padding: "1rem",
          lineHeight: "1.5",
        }}
        onClick={handleFocusEditor}
      >
        <Editor
          ref={editorRef}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={handleChange}
          customStyleMap={customStyleMap}
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
        <Select
          labelId="fontsize-select"
          label="글자크기 선택"
          value={fontSize}
          onChange={(e) => handleChangeTextSize(e)}
        >
          {[10, 14, 18, 22, 26, 30].map((size) => (
            <MenuItem value={size}>{size}px</MenuItem>
          ))}
        </Select>
        <Select
          labelId="category-select"
          label="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {villageCategories.map((category) => (
            <MenuItem value={category}>{category}</MenuItem>
          ))}
        </Select>
      </Box>
      {errMsg && <div style={{ color: "red" }}>{errMsg}</div>}

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
