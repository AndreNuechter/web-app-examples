const express = require('express');
const fileupload = require("express-fileupload");

const XLSX = require('xlsx');

const app = express();
const port = 3000;

app.use(express.static('src'), fileupload());
app.post('/', (req, res) => {
    if (!req.files)
    {
        res.send("File was not found");
        return;
    }

    const file = load_data(req.files.file.data);

    res.send(file);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function load_data(file) {
    const wb = XLSX.read(file);
    return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
}