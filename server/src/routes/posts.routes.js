import { Router } from 'express';
import Post from '../models/posts.js';

export const postBlogRoute = Router();

// GET all posts
postBlogRoute.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        res.json(post);
     } catch (err) {
        res.status(500).json({ message: err.message });
     }
    });


// GET the post by id
postBlogRoute.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });


// POST a new post
postBlogRoute.post('/', async (req, res) => {
    const post = new Post(req.body);
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    });


//PUT update a post
postBlogRoute.put('/:id', async (req, res) => {
    try {
        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            );
            if (!updatePost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(updatePost);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }    
    });


// DELETE a post
postBlogRoute.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id);
        if (!deletePost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
        