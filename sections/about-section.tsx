"use client";
import { Card, CardBody, CardFooter, Chip, Divider } from "@nextui-org/react";
import Image from "next/image";

const benefitsData = [
  {
    title: "More Control",
    description:
      "Planning your vacations allows you to have more control over your time and activities, improving your experience.",
    imageSrc: "/Benefit01.svg",
  },
  {
    title: "Memorable Experiences",
    description:
      "By planning your vacations, you can carefully choose activities and destinations, creating unforgettable memories.",
    imageSrc: "/Benefit02.svg",
  },
  {
    title: "Reduced Stress",
    description:
      "Planning ahead reduces stress related to last-minute surprises, allowing you to relax and fully enjoy your vacations.",
    imageSrc: "/Benefit03.svg",
  },
];

const AboutSection = () => {
  return (
    <section className="py-10">
      <section className="w-full 3xl:rounded-2xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-5 p-5 text-center">
          <div className="space-y-4">
            <Chip
              className="uppercase text-white"
              color="primary"
              variant="shadow"
            >
              Enjoy the Benefits of TRIPSYNC
            </Chip>

            <div className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">
                Your Vacation Plans Starts Here
              </h2>

              <p className="font-light md:text-xl/relaxed lg:text-base/relaxed">
                At TripSync, we believe in taking your vacation planning beyond
                limits. More than just trips, they are enriching experiences
                that provide unforgettable and rejuvenating moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider className="mx-auto w-full max-w-[95%]" />

      <section className="mx-auto my-8 w-full max-w-7xl">
        <div className="container grid gap-6 px-4 md:px-6 lg:gap-12">
          <div className="flex flex-col items-center justify-center gap-3 lg:items-start lg:justify-start">
            <div className="flex flex-col items-center justify-around gap-5 p-3 text-center md:p-0 xl:flex-row xl:text-start">
              <div className="flex flex-col items-start justify-start gap-3 xl:w-1/2">
                <h2 className="text-5xl font-light uppercase tracking-tighter">
                  Embrace Your <span className="font-black">Opportunities</span>
                </h2>
              </div>

              <p className="text-base/relaxed font-light xl:w-1/2">
                We encourage you to explore the possibilities of planning your
                vacations in a unique and exciting way. More than just trips,
                they are enriching experiences that offer unforgettable and
                rejuvenating moments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            {benefitsData.map((benefit) => (
              <Card
                className="border-none shadow-md"
                key={benefit.title}
                isPressable
              >
                <Image
                  alt={benefit.title}
                  className="h-full max-h-64 w-full object-cover"
                  height={0}
                  src={benefit.imageSrc}
                  width={0}
                  sizes="100vw"
                />
                <CardFooter>
                  <div className="mx-auto flex w-full flex-col items-center justify-center gap-2 py-6">
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-tiny">{benefit.description}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutSection;
