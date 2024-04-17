import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* 
export const createQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { difficulty, question, theme, comment, answers } = req.body;
    const newAnswers = answers.map((answer: { answer: string, isCorrect: boolean }) => ({
      answer: answer.answer,
      isCorrect: answer.isCorrect,
    }));
    const createdQuestion = await prisma.question.create({
      data: {
        difficulty,
        question,
        theme,
        comment,
        answers: newAnswers,
      },
      include: {
        answers: true,
      },
    });
    res.status(201).json(createdQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const question = await prisma.question.delete({
        where: {
          id: String(id),
        },
      });
      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

*/

  
/*
export const getQuestionById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const question = await prisma.question.findUnique({
        where: {
          id: String(id),
        },
        include: {
          answers: true,
        },
      });
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const { difficulty, question, theme, comment, answers } = req.body;
      const updatedAnswers = answers.map((answer: { id: string, answer: string, isCorrect: boolean }) => ({
        where: {
          id: answer.id,
        },
        data: {
          answer: answer.answer,
          isCorrect: answer.isCorrect,
        },
      }));
      const updatedQuestion = await prisma.question.update({
        where: {
          id: String(id),
        },
        data: {
          difficulty,
          question,
          theme,
          comment,
          answers: updatedAnswers,
        },
        include: {
          answers: true,
        },
      });
      res.status(200).json(updatedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'POST') {
        try {
            const { difficulty, question, theme, comment, answers } = req.body;
            const newAnswers = answers.map((answer: { answer: string, isCorrect: boolean }) => ({
                answer: answer.answer,
                isCorrect: answer.isCorrect,
            }));
            const createdQuestion = await prisma.question.create({
                data: {
                    difficulty,
                    question,
                    theme,
                    comment,
                    answers: newAnswers,
                },
                include: {
                    answers: true,
                },
            });
            return res.status(201).json(createdQuestion);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}

*/ 

type RequestBody = {
  difficulty: string;
  question: string;
  theme: string;
  comment: string;
  answers: { answer: string, correct: boolean }[];
}

export async function POST(req: NextApiRequest) {
  const body: RequestBody = req.body;
  console.log(req);
  console.log(body.question);

  return new Response(JSON.stringify({ message: 'ok' }));
  /*
  try {
      const { difficulty, question, theme, comment, answers } = req.body;
      const newAnswers = answers.map((answer: { answer: string, correct: boolean }) => ({
        answer: answer.answer,
        correct: answer.correct,
      }));
      const createdQuestion = await prisma.question.create({
        data: {
          difficulty,
          question,
          theme,
          comment,
          answers: newAnswers,
        }
      });
      return new Response(JSON.stringify(createdQuestion), {
        headers: {
          'content-type': 'application/json',
        },
        status: 201,
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Internal server error' }),{
        headers: {
          'content-type': 'application/json',
        },
        status: 500,
      });
  }
  */

}