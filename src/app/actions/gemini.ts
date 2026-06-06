"use server";

import { GoogleGenAI } from '@google/genai';
import { prisma } from "@/lib/db";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCollegeIfNotFound(searchQuery: string) {
  const prompt = `You are a college data assistant. The user searched for "${searchQuery}".
  If this is a real college or university, provide its details in the following JSON format ONLY, no markdown, no other text:
  {
    "name": "Full Name of College",
    "location": "City, State",
    "description": "A 2-sentence description of the college.",
    "fees": 150000,
    "rating": 4.5,
    "placement": 90,
    "averagePackage": 12.5,
    "highestPackage": 45.0
  }
  If it's not a real college, return {"error": "Not found"}`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    const text = response.text || "";
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(jsonStr);

    if (data.error) return null;

    const newCollege = await prisma.college.create({
      data: {
        name: data.name,
        location: data.location,
        description: data.description,
        fees: Number(data.fees),
        rating: Number(data.rating),
        placement: Number(data.placement),
        averagePackage: Number(data.averagePackage),
        highestPackage: Number(data.highestPackage),
      }
    });
    return newCollege.id;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

export async function predictColleges(exam: string, rank: string) {
  const prompt = `You are a college admission predictor. The user scored rank ${rank} in exam ${exam}.
  Recommend 3 Indian colleges based on this. Return ONLY JSON, no markdown, no backticks, no other text:
  [
    {
      "name": "College Name",
      "location": "Location",
      "fees": 150000,
      "averagePackage": 8.5
    }
  ]`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    const text = response.text || "";
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    return [];
  }
}

export async function chatWithGemini(prompt: string, context?: string) {
  const fullPrompt = context 
    ? `Context about the college:\n${context}\n\nUser Question: ${prompt}\n\nAnswer concisely and helpfully.`
    : `User Question: ${prompt}\n\nAnswer concisely and helpfully about college admissions.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    return "Sorry, I am having trouble answering that right now.";
  }
}
