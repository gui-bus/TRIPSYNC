import { Button } from "@nextui-org/react";
import Link from "next/link";
import { TbScriptPlus, TbScript } from "react-icons/tb";

const DashboardPage = () => {
  return (
    <section className="relative bg-[url('/Dashboard.svg')] bg-cover bg-center bg-no-repeat py-10 lg:py-20 3xl:rounded-b-2xl">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 p-5 text-center text-white">
        <h1 className="lg:leading-tighter flex-1 text-5xl font-black uppercase tracking-tighter lg:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="max-w-4xl flex-1 font-light">
          Immerse yourself in the excitement of crafting unique journeys, where
          each adventure is a canvas for unforgettable experiences, waiting to
          be revealed.
        </p>

        <div className="flex w-full flex-col items-center gap-5 lg:flex-row">
          <Button
            variant={"bordered"}
            size={"lg"}
            as={Link}
            href="/adventure/list"
            className="h-14 w-full uppercase text-white"
            endContent={<TbScript size={25} />}
            radius="sm"
          >
            View My Adventures
          </Button>

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
    </section>
  );
};

export default DashboardPage;
