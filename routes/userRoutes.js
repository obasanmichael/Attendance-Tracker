import express, { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../src/models/user.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { fullName, matricNumber, level, email, password } = req.body;

    // Check if user with the same email or matric number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { matricNumber }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the same email or matric number already exists.' });
    }
         // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      matricNumber,
      level,
      email,
      password: hashedPassword,
    });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
})

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // If the credentials are valid, you can create and send a token for authentication

      res.status(200).json({ message: "Login successful." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
})

export  {router};