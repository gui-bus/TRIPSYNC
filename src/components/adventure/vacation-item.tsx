"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { Vacation } from "@prisma/client";
import { format } from "date-fns";
import {
  LuCalendarDays,
  LuCalendarCheck2,
  LuUsers,
  LuTrash,
} from "react-icons/lu";
import { ReactCountryFlag } from "react-country-flag";
import { MdPrint } from "react-icons/md";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { FaRegFilePdf } from "react-icons/fa6";
import { deleteVacation } from "../../../actions/delete-vacation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface VacationItemProps {
  vacation: Vacation;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "black",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: "medium",
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "light",
  },
});

const VacationItem = ({ vacation }: VacationItemProps) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const countriesArray = vacation.countries.split(",");
  const componentRef = useRef(null);
  const router = useRouter();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDeleteClick = async () => {
    try {
      setDeleteIsLoading(true);
      await deleteVacation(vacation.id);
      toast.success("Vacation plan successfully removed!", {
        style: {
          fontSize: "12px",
        },
      });
      router.push("/dashboard");
    } catch (error) {
      return toast.error(
        "An error occurred while deleting your vacation plan!",
        {
          style: {
            fontSize: "12px",
          },
        },
      );
    } finally {
      setDeleteIsLoading(false);
    }
  };

  return (
    <Card
      className="group relative border border-input shadow-xl"
      isFooterBlurred
      isPressable
    >
      <div className="hidden group-hover:flex">
        <Button
          endContent={<LuTrash size={20} />}
          color="danger"
          isIconOnly
          className="absolute right-3 top-3 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        />
      </div>
      <div ref={componentRef} className="w-full">
        <CardHeader className="flex items-center justify-center gap-3 p-5 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <div>
              <p className="md:text-2x mx-auto w-full max-w-5xl whitespace-pre-line break-all text-xl font-bold uppercase">
                {vacation.title}
              </p>
              <p className="whitespace-pre-line break-all text-small text-default-500">
                by {vacation.name}
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row">
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-3 text-sm">
                  <LuCalendarDays size={20} />
                  {format(new Date(vacation.startDate), "dd/MM/yyyy")}
                </p>
                -
                <p className="flex items-center gap-3 text-sm">
                  <LuCalendarCheck2 size={20} />
                  {format(new Date(vacation.endDate), "dd/MM/yyyy")}
                </p>
              </div>

              <span className="hidden md:block">|</span>

              <div className="flex flex-wrap gap-3">
                {countriesArray.slice(0, 6).map((country, index) => (
                  <ReactCountryFlag
                    countryCode={country}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                    }}
                    title={country}
                    key={index}
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col items-center justify-center p-5">
          <p className="mb-2 whitespace-pre-line break-all text-sm">
            {vacation.description}
          </p>

          <div className="flex flex-col gap-5">
            <div className="mt-5 flex flex-col items-center gap-3 md:flex-row">
              {vacation.participants.length > 0 && (
                <span className="flex items-center gap-2 text-sm">
                  <LuUsers size={20} /> Participants
                </span>
              )}

              <div className="flex flex-wrap gap-2">
                {vacation.participants.map((participant, index) => (
                  <Chip
                    key={index}
                    variant="shadow"
                    color="primary"
                    radius="md"
                    className="cursor-pointer select-none text-white"
                  >
                    {participant}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
        <Divider />
      </div>
      <CardFooter className="flex w-full flex-col items-center gap-5 lg:flex-row">
        <Button
          onClick={handlePrint}
          color="primary"
          variant="shadow"
          className="h-14 w-full uppercase text-white"
          endContent={<MdPrint size={20} />}
          radius="sm"
        >
          Print Vacation Plan
        </Button>
        <div className="w-full">
          <PDFDownloadLink
            document={
              <Document>
                <Page size="A4" style={styles.page}>
                  <View style={styles.section}>
                    <Text style={styles.title}>{vacation.title}</Text>
                    <Text style={styles.text}>by {vacation.name}</Text>

                    <Text style={styles.subtitle}>Description</Text>
                    <Text style={styles.text}>{vacation.description}</Text>

                    <Text style={styles.subtitle}>Participants</Text>
                    <Text style={styles.text}>
                      {vacation.participants.join(", ")}
                    </Text>

                    <Text style={styles.subtitle}>Duration</Text>
                    <Text style={styles.text}>
                      From {format(new Date(vacation.startDate), "dd/MM/yyyy")}{" "}
                      to {format(new Date(vacation.endDate), "dd/MM/yyyy")}
                    </Text>

                    <Text style={styles.subtitle}>Locations</Text>
                    <Text style={styles.text}>{vacation.countries}</Text>
                  </View>
                </Page>
              </Document>
            }
            fileName={`${vacation.name} - ${vacation.title}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                "Loading document..."
              ) : (
                <Button
                  color="primary"
                  variant="shadow"
                  className="h-14 w-full uppercase text-white"
                  radius="sm"
                  endContent={<FaRegFilePdf size={20} />}
                >
                  Download Vacation Plan
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VacationItem;
