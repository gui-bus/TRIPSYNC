import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex py-20 w-full flex-col items-center justify-center bg-[url('/Loading.svg')] bg-cover bg-center bg-no-repeat">
      <SignUp />
    </div>
  );
}
