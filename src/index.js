import express from "express";
import fileUpload from "express-fileupload";
import {
  uploadFile,
  getFiles,
  getFile,
  downloadFile,
  getFileURL,
} from "./s3.js";

const PORT = 3000;

const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.get("/", (req, res) => {
  res.json({ message: "welcome to server with s3" });
});

app.get("/files", async (req, res) => {
  const content = await getFiles();
  res.json({ content });
});

app.get("/files/:fileName", async (req, res) => {
  const result = await getFileURL(req.params.fileName);

  res.json({ url: result });
});

app.get("/download/:fileName", async (req, res) => {
  const result = await downloadFile(req.params.fileName);
  res.send("Downloaded file");
});

app.post("/files", async (req, res) => {
  const result = await uploadFile(req.files.file);
  res.json({ result });
});

app.use(express.static("images"));

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
