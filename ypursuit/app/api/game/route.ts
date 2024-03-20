import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createGame = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, code, difficulty, theme, numberOfQuestions, status, hostId, players } = req.body;
    const newPlayers = players.map((player: { id: string }) => ({
      connect: {
        id: player.id,
      },
    }));
    const createdGame = await prisma.games.create({
      data: {
        name,
        code,
        difficulty,
        theme,
        numberOfQuestions,
        status,
        hostId: hostId,
        players: {
          create: newPlayers,
        },
      },
      include: {
        players: true,
      },
    });
    res.status(201).json(createdGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteGame = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const game = await prisma.games.delete({
        where: {
          id: String(id),
        },
      });
      res.status(200).json(game);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const getGames = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const games = await prisma.games.findMany({
        include: {
          players: true,
        },
      });
      res.status(200).json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
export const getGameById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const game = await prisma.games.findUnique({
      where: {
        id: String(id),
      },
      include: {
        players: true,
      },
    });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateGame = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const { name, code, difficulty, theme, numberOfQuestions, status, hostId, players } = req.body;
      const updatedPlayers = players.map((player: { id: string }) => ({
        connect: {
          id: player.id,
        },
      }));
      const updatedGame = await prisma.games.update({
        where: {
          id: String(id),
        },
        data: {
          name,
          code,
          difficulty,
          theme,
          numberOfQuestions,
          status,
          hostId: hostId,
          players: {
            set: updatedPlayers,
          },
        },
        include: {
          players: true,
        },
      });
      res.status(200).json(updatedGame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};