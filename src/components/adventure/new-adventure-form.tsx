"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectItem,
  Button,
  Input,
  Textarea,
  Chip,
  Divider,
  Checkbox,
  CircularProgress,
  Link,
} from "@nextui-org/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineAddTask } from "react-icons/md";
import { TbCalendarPin } from "react-icons/tb";
import {
  MdDriveFileRenameOutline,
  MdTitle,
  MdOutlineSubtitles,
  MdDelete,
} from "react-icons/md";
import { IoMdGlobe } from "react-icons/io";
import { FaUsersViewfinder, FaUserPlus } from "react-icons/fa6";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { countries } from "../../../utils/data";
import { createVacation } from "../../../actions/new-vacation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z
    .string({ required_error: "A name is required!" })
    .trim()
    .min(1, "Field required!"),
  title: z
    .string({ required_error: "A title is required!" })
    .trim()
    .min(1, "Field required!"),
  description: z
    .string({ required_error: "A description is required!" })
    .trim()
    .min(1, "Field required!"),
  countries: z.string({ required_error: "At least one country is required!" }),
  startDate: z
    .date({
      required_error: "A start date is required.",
    })
    .nullable(),
  endDate: z
    .date({
      required_error: "A end date is required.",
    })
    .nullable(),
  participants: z.array(z.string()).default([]).optional(),
  isPublic: z.boolean().optional(),
  userId: z.string().optional(),
});

const NewAdventureForm = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedCountries, setSelectedCountries] = useState(new Set([]));

  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");

  const [isPublic, setIsPublic] = useState(false);
  const router = useRouter();

  const { user } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const requiredFields = useMemo(
    () => ["name", "title", "description", "countries", "startDate", "endDate"],
    [],
  );

  const formValues = form.getValues();

  const calculateProgress = useCallback(() => {
    let filledFields = 0;
    requiredFields.forEach((field) => {
      if (
        formValues[field as keyof typeof FormSchema.shape] !== undefined &&
        formValues[field as keyof typeof FormSchema.shape] !== null &&
        formValues[field as keyof typeof FormSchema.shape] !== ""
      ) {
        filledFields++;
      }
    });
    return (filledFields / requiredFields.length) * 100;
  }, [requiredFields, formValues]);

  const [formProgress, setFormProgress] = useState(calculateProgress());

  useEffect(() => {
    setFormProgress(calculateProgress());
  }, [calculateProgress]);

  const handleClose = (participantToRemove: any) => {
    setParticipants(
      participants.filter(
        (participants) => participants !== participantToRemove,
      ),
    );
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim() !== "") {
      setParticipants([...participants, newParticipant]);
      setNewParticipant("");
    }
  };

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      data.participants = participants;
      data.isPublic = isPublic;
      data.userId = user?.id ?? "";

      if (!data.startDate || !data.endDate) {
        throw new Error("Start date and end date are required.");
      }

      await createVacation({ data });

      form.setValue("name", "");
      form.setValue("title", "");
      form.setValue("description", "");
      form.setValue("startDate", null);
      form.setValue("endDate", null);
      form.setValue("countries", "");
      form.setValue("participants", []);

      setSelectedCountries(new Set([]));
      setParticipants([]);
      setIsPublic(false);

      toast.success("Vacation plan successfully created!", {
        style: {
          fontSize: "12px",
        },
      });

      router.push("/adventure/list");

      console.log({ data });
    } catch (error) {
      toast.error("Error!", {
        style: {
          fontSize: "12px",
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <p className="ml-auto select-none text-xs">
        Fields marked with <span className="text-red-500">*</span> are required.
      </p>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-1 flex-col items-center gap-5 lg:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal">
                    Name<span className="ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      variant="bordered"
                      size="md"
                      labelPlacement="outside"
                      radius="sm"
                      placeholder="Enter your name."
                      isRequired
                      startContent={
                        <MdDriveFileRenameOutline
                          size={20}
                          className="opacity-50"
                        />
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal">
                    Title<span className="ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      variant="bordered"
                      size="md"
                      labelPlacement="outside"
                      radius="sm"
                      placeholder="Give your adventure a title to remember!"
                      isRequired
                      startContent={
                        <MdTitle size={20} className="opacity-50" />
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="countries"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">
                  Countries <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    placeholder="Choose the countries you want to visit."
                    selectedKeys={selectedCountries}
                    onSelectionChange={setSelectedCountries as any}
                    selectionMode="multiple"
                    variant="bordered"
                    radius="sm"
                    startContent={
                      <IoMdGlobe size={20} className="opacity-50" />
                    }
                  >
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    label="Description"
                    description="Use this field to outline your vacation plans, including activities, destinations, and any special details you want to remember."
                    autoComplete="off"
                    variant="bordered"
                    labelPlacement="outside"
                    radius="sm"
                    isRequired
                    startContent={
                      <MdOutlineSubtitles size={20} className="opacity-50" />
                    }
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex w-full flex-col items-center gap-5 lg:flex-row">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="font-normal">
                    Start date <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"bordered"}
                          radius="sm"
                          className="w-full border-input"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a start date</span>
                          )}
                          <TbCalendarPin className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value !== null ? field.value : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                          setStartDate(date);
                        }}
                        fromDate={new Date()}
                        initialFocus
                        styles={{
                          head_cell: {
                            textTransform: "capitalize",
                          },
                          caption: {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="font-normal">
                    End Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={
                            startDate === undefined ? "faded" : "bordered"
                          }
                          radius="sm"
                          className="w-full border-input disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
                          disabled={startDate === undefined}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a end date</span>
                          )}
                          <TbCalendarPin className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value !== null ? field.value : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                          setEndDate(date);
                        }}
                        fromDate={startDate}
                        initialFocus
                        styles={{
                          head_cell: {
                            textTransform: "capitalize",
                          },
                          caption: {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem className="w-full lg:-mt-2">
                  <FormLabel className="font-normal">Participants</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-5">
                      <Input
                        autoComplete="off"
                        variant="bordered"
                        size="md"
                        labelPlacement="outside"
                        radius="sm"
                        placeholder="Enter the name of participants"
                        value={newParticipant}
                        onChange={(e) => setNewParticipant(e.target.value)}
                        startContent={
                          <FaUsersViewfinder size={20} className="opacity-50" />
                        }
                      />

                      <Button
                        onClick={handleAddParticipant}
                        radius="sm"
                        variant="shadow"
                        color="primary"
                        endContent={
                          <FaUserPlus size={20} className="text-white" />
                        }
                        isIconOnly
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {participants.length > 0 && (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-wrap gap-3">
                {participants.map((participants, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleClose(participants)}
                    variant="flat"
                    radius="md"
                  >
                    {participants}
                  </Chip>
                ))}
              </div>

              <Button
                onClick={() => setParticipants([])}
                radius="sm"
                variant="bordered"
                className="border border-input"
                endContent={<MdDelete size={20} />}
              >
                Remove all participants
              </Button>

              <Divider />
            </div>
          )}

          <Checkbox isSelected={isPublic} onValueChange={setIsPublic}>
            Share my vacation plans publicly
          </Checkbox>

          <div className="flex flex-col items-center justify-center w-full gap-2">
            <div className="flex items-center gap-5 w-full">
              <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={formProgress}
                color="primary"
                showValueLabel={true}
              />
              <Button
                variant={"shadow"}
                color="primary"
                type="submit"
                radius="sm"
                disabled={formProgress !== 100}
                className="w-full uppercase text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
                endContent={<MdOutlineAddTask size={25} />}
              >
                Start Adventure
              </Button>
            </div>

            <p className="text-xs">
              Already created a vacation plan?{" "}
              <Link href="/adventure/list" className="text-xs">
                click here
              </Link>{" "}
              to view it.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewAdventureForm;
