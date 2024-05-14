import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/users.js';
import jwt from 'jsonwebtoken'; 

const registerRoute = express.Router();

registerRoute.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username o email già in uso' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    res.status(201).json({ message: 'Utente registrato con successo', token });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la registrazione', error });
  }
});

export default registerRoute;

