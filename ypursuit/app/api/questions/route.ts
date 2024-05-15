import { PrismaClient } from '@prisma/client';
import {NextRequest} from "next/server";

const prisma = new PrismaClient();

const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export async function GET(request: NextRequest) {
    const maxQuestions = request.nextUrl.searchParams.get('maxRounds');
    const difficulty = request.nextUrl.searchParams.get('difficulty');
    const theme = request.nextUrl.searchParams.get('theme');

    if (maxQuestions && difficulty && theme) {

        // handle all difficulties
        if (difficulty === '4') {
            const allQuestions = await prisma.question.findMany({
                where: {
                    theme: theme,
                }
            });

            const questions = shuffleArray(allQuestions).slice(0, parseInt(maxQuestions));

            return new Response(JSON.stringify(questions), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 200,
            });
        }

        const allQuestions = await prisma.question.findMany({
            where: {
                difficulty: parseInt(difficulty),
                theme: theme,
            }
        });

        const questions = shuffleArray(allQuestions).slice(0, parseInt(maxQuestions));

        return new Response(JSON.stringify(questions), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });
    }

    const questions = await prisma.question.findMany();

    return new Response(JSON.stringify(questions), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 200,
    });
}


