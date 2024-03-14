"use server";

import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "../lib/prisma";

interface createVacationProps {
  data: {
    name: string;
    title: string;
    description: string;
    countries: string;
    startDate: Date | null;
    endDate: Date | null;
    participants?: string[] | undefined
    isPublic?: boolean;
    userId?: string;
  };
}

export const createVacation = async ({ data }: createVacationProps) => {
  await prismaClient.vacation.create({
    data: {
      id: uuidv4(),
      name: data.name,
      title: data.title,
      description: data.description,
      countries: data.countries,
      startDate: data.startDate ?? new Date(),
      endDate: data.endDate ?? new Date(),
      isPublic: data.isPublic,
      participants: data.participants ?? [],
      userId: data.userId,
    },
  });
};
