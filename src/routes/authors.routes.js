import { Router } from 'express';
import Authors from '../models/authors.js';

export const authorsRoute = Router();

// GET all authors
authorsRoute.get('/', async (req, res) => {
    try {
        const authors = await Authors.find();
        res.json(authors);
     } catch (err) {
        res.status(500).json({ message: err.message });
     }
    });


// GET the author by id
authorsRoute.get('/:id', async (req, res) => {
    try {
        const author = await Authors.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
            }
            res.json(author);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });


// POST a new author
authorsRoute.post('/', async (req, res) => {
    const author = new Authors(req.body);
    try {
        const newAuthor = await author.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    });


//PUT update an author
authorsRoute.put('/:id', async (req, res) => {
    try {
        const updateAuthors = await Authors.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            );
            if (!updateAuthors) {
                return res.status(404).json({ message: 'Author not found' });
            }
            res.json(updateAuthors);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }    
    });


// DELETE an author
authorsRoute.delete('/:id', async (req, res) => {
    try {
        const deleteAuthors = await Authors.findByIdAndDelete(req.params.id);
        if (!deleteAuthors) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
        