const fs = require("fs");
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get("/notes", async (req, res) => {        
    console.log("\n\nExecuting GET notes request");
    let data = await JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log("\nGET request - Returning notes data: " + JSON.stringify(data));
    res.json(data);
});

router.post("/notes", (req, res) => {
    const newNote = req.body;
    console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));
    newNote.id = uuidv4();
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    data.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    console.log("\nSuccessfully added new note to 'db.json' file!");
    res.json(data);
});

router.delete("/notes/:id", (req, res) => {
    let noteId = req.params.id.toString();
    console.log(`\n\nDELETE note request for noteId: ${noteId}`);
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const newData = data.filter( note => note.id.toString() !== noteId );
    fs.writeFileSync('./db/db.json', JSON.stringify(newData));        
    console.log(`\nSuccessfully deleted note with id : ${noteId}`);
    res.json(newData);
});

module.exports = router