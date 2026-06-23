import { BarChart3, Shield, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: BarChart3,
    title: "Analytics ready",
    description: "Chart and table components included for dashboards and reports.",
  },
  {
    icon: Users,
    title: "Form patterns",
    description: "Inputs, selects, checkboxes, and dialog flows wired up as examples.",
  },
  {
    icon: Shield,
    title: "Accessible by default",
    description: "Built on Radix/Base UI primitives with keyboard and screen reader support.",
  },
];

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">What&apos;s included</h2>
        <p className="mt-2 text-muted-foreground">
          Reusable section templates you can copy into new pages or adapt for your product.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="size-5 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Edit templates in <code className="text-xs">src/components/templates/</code>.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
