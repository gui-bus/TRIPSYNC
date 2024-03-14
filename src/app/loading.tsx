import { Spinner } from "@nextui-org/react";
const Loading = () => {
  return (
    <div className="flex min-h-screen w-full flex-grow flex-col items-center justify-center bg-[url('/loading.svg')] bg-cover bg-center bg-no-repeat">
      <Spinner label="Loading..." color="primary" />
    </div>
  );
};

export default Loading;
