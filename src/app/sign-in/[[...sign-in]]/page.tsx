import { SignIn } from "@clerk/nextjs";


export default function Page() {
  return (
    <div className="flex py-20 w-full items-center justify-center bg-[url('/loading.svg')] bg-cover bg-center bg-no-repeat">
      <SignIn />
    </div>
  );
}
