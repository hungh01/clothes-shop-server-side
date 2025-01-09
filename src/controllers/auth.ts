import { Request, Response } from 'express';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 12;

export const register = async (req: Request, res: Response): Promise<any> => {
    const { name, phone, address, email, password } = req.body;
    if (!name || !phone || !address || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
        return res.sendStatus(400);
    }
    const hashedPassword: any = await bcrypt.hash(password, saltRounds);

    try {
        const user = await User.create({ name: name, phone: phone, address: address, email: email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email ,role: user.role},
        process.env.JWT_SECRET_KEY || "",
        { expiresIn: "1h" }
    );

    //Send the jwt in the response
    return res.status(200).send(token);
}