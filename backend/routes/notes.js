const express = require('express');
const Notes = require('../models/Notes');
const fetchuser = require('../models/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/fetch',fetchuser,async (req,res)=>{
    try {
    const notes=await Notes.find({ userId :req.userId});
    res.json(notes);

    } catch (error) {
        console.log(error);
        res.status(400).send('some error occured');
    }

})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.post('/addnotes',fetchuser,[
    body('title').isLength({ min: 3 }).withMessage('title must be at least 3 characters long'),
    body('description').isLength({ min: 5 }).withMessage('Please provide a valid description')
],async (req,res)=>{
  try {
    const {title,description,tag}=req.body
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const note =new Notes({
        title,description,tag,user:req.user.userId

    })
    const savenote = await note.save();
    res.json(savenote)

  } catch (error) {
    console.log(error);
    res.status(400).send('some error occured');
  }


})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.put('/modifynotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Build a newNote object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
       
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

     
        if (note.user.toString() !== req.user.userId) {
            return res.status(403).send('Not allowed');
        }

        
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



router.delete('/delete/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
       
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

     
        if (note.user.toString() !== req.user.userId) {
            return res.status(403).send('Not allowed');
        }

        
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json('note is deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports=router