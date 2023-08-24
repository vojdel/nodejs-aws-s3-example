import express from "express";
import fileupload from 'express-fileupload';
import { AWS } from '../config';

const PORT = 3000;

const app = express();

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './upload'
}));

app.get('/', (req, res) => {
    res.json({ message: 'welcome to server with s3'})
})

app.post('/files', (req, res) => {
    console.log(req.files);
    const name = req.files.file.name;
    const msg = `name: ${name}`;
    res.json({ message: 'uploaded File'})
})

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
