"use client";

import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContactForm } from "@/components/templates/contact-form";
import { InfoIcon, MoreHorizontal } from "lucide-react";
import { useState } from "react";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function ComponentGallery() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(62);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Component gallery</h1>
        <p className="max-w-2xl text-muted-foreground">
          Live examples of the pre-installed shadcn/ui components and page templates. Use these as
          reference when building new screens.
        </p>
      </div>

      <Section title="Buttons & badges" description="Variants, sizes, and status chips.">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Section title="Form controls">
        <Card>
          <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-input">Input</Label>
                <Input id="demo-input" placeholder="Type something..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-textarea">Textarea</Label>
                <Textarea id="demo-textarea" placeholder="Multi-line text..." />
              </div>
              <div className="space-y-2">
                <Label>Select</Label>
                <Select defaultValue="starter">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Checkbox id="terms" defaultChecked />
                <Label htmlFor="terms">Accept terms</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="notifications" defaultChecked />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <RadioGroup defaultValue="monthly" className="space-y-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly billing</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly">Yearly billing</Label>
                </div>
              </RadioGroup>
              <div className="space-y-2">
                <Label>Slider ({progress}%)</Label>
                <Slider
                  value={[progress]}
                  onValueChange={(value) =>
                    setProgress(Array.isArray(value) ? (value[0] ?? 0) : value)
                  }
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Feedback & overlays">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast("Hello from Sonner")}>Show toast</Button>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog template</DialogTitle>
                <DialogDescription>
                  Use this pattern for confirmations, forms, or detail views.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              Delete item
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>Tooltip example</TooltipContent>
          </Tooltip>
        </div>
        <Alert>
          <InfoIcon />
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            Alerts are great for inline status messages and lightweight warnings.
          </AlertDescription>
        </Alert>
      </Section>

      <Section title="Data display">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Table component with actions menu.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Alex Kim", role: "Admin", status: "Active" },
                    { name: "Sam Lee", role: "Editor", status: "Active" },
                    { name: "Jordan Fox", role: "Viewer", status: "Invited" },
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{row.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">shadcn</p>
                <p className="text-sm text-muted-foreground">@shadcn</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage used</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Navigation patterns">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="pt-6 text-sm text-muted-foreground">
                Tab panels work well for settings pages and multi-step content.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardContent className="pt-6 text-sm text-muted-foreground">
                Drop charts or tables into each tab panel.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardContent className="pt-6 text-sm text-muted-foreground">
                Pair with form controls for editable settings.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Accordion className="rounded-xl border px-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is included in this starter?</AccordionTrigger>
            <AccordionContent>
              Layout shells, page section templates, and the full shadcn/ui component set.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Where do I add new components?</AccordionTrigger>
            <AccordionContent>
              Run <code className="text-xs">npx shadcn@latest add [component]</code> or edit files
              under <code className="text-xs">src/components/ui/</code>.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Calendar">
        <Card className="w-fit">
          <CardContent className="pt-6">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </CardContent>
        </Card>
      </Section>

      <Separator />

      <Section title="Contact form template">
        <ContactForm />
      </Section>
    </div>
  );
}
