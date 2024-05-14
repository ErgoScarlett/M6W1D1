import { Router } from 'express';
import Post from '../models/posts.js';
import Comment from '../models/comments.js';
import CloudinaryCover from '../middleware/cover.js';
import { authMidd } from '../auth/jwt.js';


export const postBlogRoute = Router();

// GET all posts
postBlogRoute.get('/', async (req, res, next) => {
    try {
        //http://localhost:3001/blogs?title=tech&page=3
    
        const page = req.query.page || 1
        let posts = await Post.find(
          req.query.title ? { title: { $regex: req.query.title } } : {}
        )
          .limit(20)
          .skip(20 * (page - 1))
          .populate({
            path: "comments",
            populate: {
              path: "author",
              select: ["name", "lastName", "avatar"],
            },
            options: {
              limit: 2,
            },
          })
        res.send(posts)
      } catch (error) {
        next(error)
      }
    });


// GET the post by id
postBlogRoute.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        } catch (error) {
            next(error);
        }
    });  


// POST a new post
postBlogRoute.post('/', authMidd, async (req, res, next) => {
    try {
      const { title, content, category } = req.body;
      const author = req.user._id;
      const newPost = new Post({
        title,
        content,
        category,
        author,
      });  
      const savedPost = await newPost.save();  
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
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


//PATCH update a cover for a post
postBlogRoute.patch( '/:id/cover', CloudinaryCover, async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.cover = req.file.path;
      const updatedPost = await post.save();

      res.json(updatedPost);
    } catch (error) {
     next(error)
    }
  }
);


// CRUD for the comments 

// GET the comments
postBlogRoute.get('/:id/comments', async (req, res, next) => {
    try {
     const post = await Post.findById(req.params.id).populate({
             path: "comments",
             populate: {
               path: "author",
               select: ["name", "lastName", "avatar"],
             },
           })
           if (post) {
             res.send(post.comments)
           } else res.sendStatus(404)
         } catch (error) {
           next(error)
         }
       });  


// POST a new comment
postBlogRoute.post("/:id/comments", authMidd, async (req, res, next) => {
    try {
      const comment = new Comment({...req.body, author: req.user._id})
      await comment.save()
  
      await Blog.findByIdAndUpdate(req.params.id, {
        $push: {
          comments: comm._id,
        },
      })
      res.send(comment)
    } catch (error) {
      next(error)
    }
  });


// GET for a single comment  
postBlogRoute.get("/:id/comments/:commentId", async (req, res, next) => {
    try {
      let comment = await Comment.findById(req.params.commentId).populate({
        path: "author",
        select: ["name", "lastName", "avatar"],
      })
  
      res.send(comment)
    } catch (error) {
      next(error)
    }
  });


// PUT for a single comment
postBlogRoute.put("/:id/comments/:commentId", async (req, res, next) => {
    try {
      let comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        { new: true }
      )  
      res.send(comment)
    } catch (error) {
      next(error)
    }
  });


// DELETE for a single comment  
postBlogRoute.delete("/:id/comments/:commentId", async (req, res, next) => {
    try {
      await Blog.findByIdAndDelete(req.params.id)  
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  });



        