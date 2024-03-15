"use client";
import VacationItem from "@/components/adventure/vacation-item";
import { useEffect, useState } from "react";
import { Vacation } from "@prisma/client";
import { Button, Link } from "@nextui-org/react";
import { TbScriptPlus } from "react-icons/tb";
import { publicVacations } from "../../../../actions/vacations";

const PublicVacationListPage = () => {
  const [vacationsData, setVacationsData] = useState<Vacation[]>([]);

  useEffect(() => {
    const fetchVacationsData = async () => {
      const data = await publicVacations();
      setVacationsData(data);
    };
    fetchVacationsData();
  }, []);

  return (
    <section>
      <div className="relative bg-[url('/Adventure3.svg')] bg-cover bg-center bg-no-repeat py-10 lg:py-10 3xl:rounded-b-2xl">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 p-5 text-center text-white">
          <h1 className="lg:leading-tighter w-full flex-1 text-center text-5xl font-black uppercase tracking-tighter text-white">
            Explore Exciting Vacation Ideas
          </h1>

          <p className="max-w-4xl flex-1 font-light">
            Explore and discover vacation plans shared by others. View, print,
            or download them as PDFs for inspiration and planning your own
            adventures.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl p-5">
        {vacationsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <div>
              <h2 className="text-xl font-bold">
                Oops! It seems there are no public vacation plans available yet.
              </h2>
              <p className="font-light">
                Why not start by creating your first vacation plan and making it
                public?
              </p>
            </div>

            <div className="flex w-full flex-col items-center">
              <Button
                variant={"shadow"}
                color="primary"
                size={"lg"}
                as={Link}
                href="/adventure/new"
                className="h-14 w-full uppercase text-white"
                endContent={<TbScriptPlus size={25} />}
                radius="sm"
              >
                Plan a New Adventure
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {vacationsData?.map((vacation) => (
              <VacationItem
                key={vacation.id}
                vacation={vacation}
                isPublicPage={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicVacationListPage;
