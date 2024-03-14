"use client";
import VacationList from "@/components/adventure/vacations-list";
import { useUser } from "@clerk/nextjs";

const AdventureListPage = () => {
  const { user } = useUser();
  return (
    <main>
      <VacationList userId={user?.id || ""} />
    </main>
  );
};

export default AdventureListPage;
