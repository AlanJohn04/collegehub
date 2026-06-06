"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createQuestion(title: string, body: string, authorId: string, authorName: string) {
  const newQuestion = await prisma.question.create({
    data: {
      title,
      body,
      authorId,
      authorName,
    }
  });
  revalidatePath('/discussions');
  return newQuestion;
}
