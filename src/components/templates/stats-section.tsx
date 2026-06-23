import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "UI components", value: "45+" },
  { label: "Page templates", value: "6" },
  { label: "Layout shells", value: "3" },
  { label: "Setup time", value: "< 5 min" },
];

export function StatsSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold tabular-nums">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
