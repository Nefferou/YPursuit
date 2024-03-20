import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const user = await prisma.user.delete({
      where: {
        id: String(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const user = await prisma.user.findUnique({
        where: {
          id: String(id),
        },
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const { username, email, password } = req.body;
      const user = await prisma.user.update({
        where: {
          id: String(id),
        },
        data: {
          username,
          email,
          password,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  