import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSkin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, image, price, description, isReleased, userId } = req.body;
    const createdSkin = await prisma.skin.create({
      data: {
        name,
        image,
        price,
        description,
        isReleased,
        userId: userId,
      },
    });
    res.status(201).json(createdSkin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteSkin = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const skin = await prisma.skin.delete({
        where: {
          id: String(id),
        },
      });
      res.status(200).json(skin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSkins = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const skins = await prisma.skin.findMany();
      res.status(200).json(skins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
export const getSkinById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const skin = await prisma.skin.findUnique({
      where: {
        id: String(id),
      },
    });
    if (!skin) {
      return res.status(404).json({ message: 'Skin not found' });
    }
    res.status(200).json(skin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateSkin = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const { name, image, price, description, isReleased } = req.body;
      const updatedSkin = await prisma.skin.update({
        where: {
          id: String(id),
        },
        data: {
          name,
          image,
          price,
          description,
          isReleased,
        },
      });
      res.status(200).json(updatedSkin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};