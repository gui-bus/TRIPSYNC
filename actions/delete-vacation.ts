"use server";

import { revalidatePath } from "next/cache";
import { prismaClient } from "../lib/prisma";

export const deleteVacation = async (vacationId: string) => {
  await prismaClient.vacation.delete({
    where: {
      id: vacationId,
    },
  });

  revalidatePath("/adventure/list");
  revalidatePath("/");
};
