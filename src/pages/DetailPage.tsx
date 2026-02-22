import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchItemById } from "@/services/itemsService";
import BackLink from "@/components/BackLink";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

interface SectionProps {
  title: string;
  fields: { label: string; value: string }[];
}

const Section = ({ title, fields }: SectionProps) => (
  <div className="space-y-3">
    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.label}>
          <p className="text-xs text-muted-foreground">{f.label}</p>
          <p className="text-sm font-medium text-foreground">{f.value}</p>
        </div>
      ))}
    </div>
  </div>
);

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading, error, refetch } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchItemById(id!),
    enabled: !!id,
  });

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8">
      <BackLink to="/main" label="Back to Main" />

      {isLoading && <LoadingState label="Loading details..." />}
      {error && <ErrorState message={(error as Error).message} onRetry={() => refetch()} />}

      {item && (
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
              {item.name.charAt(0)}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{item.name}</h1>
          </div>

          <div className="rounded-xl border bg-card p-6 card-shadow space-y-6">
            <Section
              title="Basic"
              fields={[
                { label: "Username", value: item.username },
                { label: "Email", value: item.email },
                { label: "Phone", value: item.phone },
                { label: "Website", value: item.website },
              ]}
            />
            <div className="border-t" />
            <Section
              title="Address"
              fields={[
                { label: "Street", value: item.address.street },
                { label: "Suite", value: item.address.suite },
                { label: "City", value: item.address.city },
                { label: "Zipcode", value: item.address.zipcode },
              ]}
            />
            <div className="border-t" />
            <Section
              title="Company"
              fields={[
                { label: "Company", value: item.company.name },
                { label: "Catch Phrase", value: item.company.catchPhrase },
                { label: "BS", value: item.company.bs },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
