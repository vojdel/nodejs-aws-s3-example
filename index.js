import express from "express";
import fileupload from 'express-fileupload';

const PORT = 3000;

const app = express();

app.use(fileupload());

app.get('/', (req, res) => {
    res.json({ message: 'welcome to server with s3'})
})

app.post('/files', (req, res) => {
    console.log(req.files);
})

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
