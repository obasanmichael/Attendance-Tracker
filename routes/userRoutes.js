import express, { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../src/models/user.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
        const { fullName, matricNumber, level, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { matricNumber }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the same email or matric number already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      matricNumber,
      programme,
      level,
      email,
      password: hashedPassword,
    });

        await newUser.save();
      res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
})

router.post('/login', async (req, res) => {
    try {
      const { matricNumber, password } = req.body;

      const user = await User.findOne({ matricNumber });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
})

export  {router};