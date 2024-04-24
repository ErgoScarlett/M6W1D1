import { Router } from 'express';
import Comment from '../models/comments.js';

export const commentsRoute = Router();

// GET all comments
commentsRoute.get('/blogPosts/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET comments by post ID
commentsRoute.get('/blogPosts/:id/comments/:commentId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new comment
commentsRoute.post('/blogPosts/:id', async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a comment
commentsRoute.put('/blogPost/:id/comments/commentId', async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a comment
commentsRoute.delete('/blogPost/:id/comments/commentId', async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
