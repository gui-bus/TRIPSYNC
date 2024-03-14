"use server";

import { prismaClient } from "../lib/prisma";
import { Vacation } from "@prisma/client";

export const userVacations = async (userId: string): Promise<Vacation[]> => {
  const vacationsData = await prismaClient.vacation.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      startDate: "asc",
    },
  });
  return vacationsData;
};

export const publicVacations = async (): Promise<Vacation[]> => {
  const vacationsData = await prismaClient.vacation.findMany({
    where: {
      isPublic: true,
    },
    orderBy: {
      startDate: "asc",
    },
  });
  return vacationsData;
};
