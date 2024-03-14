import NewAdventureForm from "@/components/adventure/new-adventure-form";

const NewAdventurePage = () => {
  return (
    <section>
      <div className="relative bg-[url('/Adventure.svg')] bg-cover bg-center bg-no-repeat py-10 lg:py-10 3xl:rounded-b-2xl">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 p-5 text-center text-white">
          <h1 className="lg:leading-tighter w-full flex-1 text-center text-5xl font-black uppercase tracking-tighter text-white">
            Time to Begin Your Journey
          </h1>
          <p className="max-w-4xl flex-1 font-light">
            Unleash your creativity and start shaping a new vacation experience
            by filling in the fields below to craft a unique and unforgettable
            holiday plan.
          </p>
        </div>
      </div>

      <NewAdventureForm/>
    </section>
  );
};

export default NewAdventurePage;
