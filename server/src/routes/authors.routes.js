import { Router } from 'express';
import Authors from '../models/authors.js';
import CloudinaryAvatar from '../middleware/avatar.js';
import { authMidd } from '../auth/jwt.js';
import bcrypt from 'bcrypt';

export const authorsRoute = Router();

// GET all authors
authorsRoute.get('/', async (req, res, next) => {    
    try {
        const page = req.query.page || 1    
        let authors = await Authors.find()
          .limit(20)
          .skip(20 * (page - 1))
        res.send(authors)
      } catch (error) {
        next(error)
      }
    });


authorsRoute.post("/login", async ({ body }, res, next) => {
    try {
        let foundUser = await Authors.findOne({
        email: body.email,
        })
        if (foundUser) {
        const matching = await bcrypt.compare(body.password, foundUser.password)
        if (matching) {
        const token = await generateJWT({
        lastName: foundUser.lastName,
        email: foundUser.email,
        })
        res.send({ user: foundUser, token })
        } else res.status(400).send("Wrong password")
        } else res.status(400).send("User does not exist.")
        } catch (error) {
          next(error)
        }
      });


authorsRoute.get("/me", authMidd, async (req, res, next) => {
    try {
        let author = await Authors.findById(req.user.id)
        res.send(author)
        } catch (error) {
            next(error) 
        }
      });


// GET the author by id
authorsRoute.get('/:id', async (req, res, next) => {
    try {
        const author = await Authors.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
            }
            res.json(author);
        } catch (error) {
            next(error);
        }
    });


// POST a new author
authorsRoute.post("/", async (req, res, next) => {
    try {
      let author = await Authors.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10),
      })
      res.send(author)
    } catch (error) {
      next(error)
    }
  });  


//PUT update an author
authorsRoute.put('/:id', async (req, res, next) => {
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
            next(err);
        }
        });


// DELETE an author
authorsRoute.delete('/:id', async (req, res, next) => {
    try {
        const deleteAuthors = await Authors.findByIdAndDelete(req.params.id);
        if (!deleteAuthors) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author deleted successfully' });
    } catch (err) {
        next(err);
    }
});
        

//PATCH update an avatar
authorsRoute.patch('/:id/avatar', CloudinaryAvatar, async (req, res, next) => {
    try {
      const author = await Author.findById(req.params.id);  
      if (!author) {
        return res.status(404).json({ message: 'Autore non trovato' });
      }  
      author.avatar = req.file.path;
      const updatedAuthor = await author.save();  
      res.json(updatedAuthor);
    } catch (error) {
      next(error);
    }
  });
  
  