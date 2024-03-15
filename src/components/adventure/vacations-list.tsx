/**
 * VacationList Component
 *
 * This component displays the list of vacation plans created by the currently logged-in user.
 *
 * Features:
 * - Displays all user-entered information from the form.
 * - Shows vacation plans created by the logged-in user.
 * - Provides an option to create a new plan if none exists.
 */

import VacationItem from "@/components/adventure/vacation-item";
import { userVacations } from "../../../actions/vacations";
import { useEffect, useState } from "react";
import { Vacation } from "@prisma/client";
import { Button, Link } from "@nextui-org/react";
import { TbScriptPlus } from "react-icons/tb";
import { Button as ShadcnButton } from "@/components/ui/button";

const VacationList = ({ userId }: { userId: string }) => {
  const [vacationsData, setVacationsData] = useState<Vacation[]>([]);

  const OnRefetchClick = () => {
    const fetchVacationsData = async () => {
      const data = await userVacations(userId);
      setVacationsData(data);
    };
    fetchVacationsData();
  };

  useEffect(() => {
    const fetchVacationsData = async () => {
      const data = await userVacations(userId);
      setVacationsData(data);
    };
    fetchVacationsData();
  }, [userId]);

  return (
    <section>
      <div className="relative bg-[url('/Adventure2.svg')] bg-cover bg-center bg-no-repeat py-10 lg:py-10 3xl:rounded-b-2xl">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 p-5 text-center text-white">
          <h1 className="lg:leading-tighter w-full flex-1 text-center text-5xl font-black uppercase tracking-tighter text-white">
            Explore Your Vacation Plans
          </h1>
          <p className="max-w-4xl flex-1 font-light">
            Explore and manage your vacation plans here. View, print, or
            download them as PDFs for future reference.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl p-5">
        {vacationsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <div>
              <h2 className="text-xl font-bold">
                Oops! It looks like you haven&apos;t added any vacation plans
                yet.
              </h2>
              <p className="font-light">
                Why not start by creating your first vacation plan?
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

              <p className="text-xs">
                Already have a vacation plan that isn&apos;t showing up on the
                list?
                <ShadcnButton
                  variant={"link"}
                  onClick={OnRefetchClick}
                  className="px-0 pl-1 text-xs text-black opacity-70 transition-all duration-200 ease-in-out hover:text-primary"
                >
                  Click here to update it.
                </ShadcnButton>
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {vacationsData?.map((vacation) => (
              <VacationItem key={vacation.id} vacation={vacation} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VacationList;
