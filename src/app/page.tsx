"use client"

import * as React from "react"
import { toast } from "sonner"
import Link from "next/link"
import {
  Activity,
  ArrowRight,
  Calendar as CalendarIcon,
  ExternalLink,
  HelpCircle,
  MoreHorizontal,
  Search,
  Settings,
  Smile,
  User,
  Terminal,
  AlertCircle,
  Layout,
  Type,
  Box,
  MousePointer2,
  Navigation,
  Layers,
  BarChart3,
  Image as ImageIcon,
} from "lucide-react"
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  ResponsiveContainer,
} from "recharts"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldLabel, FieldDescription, FieldGroup } from "@/components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import { NativeSelect } from "@/components/ui/native-select"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--secondary)",
  },
} satisfies ChartConfig

function Section({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Icon className="size-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  )
}

export default function ShowcasePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [progress, setProgress] = React.useState(13)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1">
              <Activity className="size-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Shadcn Ultimate Showcase</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              <Search className="mr-2 size-4" />
              Quick Search
              <Kbd className="ml-2">⌘K</Kbd>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/shadcn-ui/ui" target="_blank" rel="noreferrer">
                <ExternalLink className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container flex-1 space-y-16 py-12 px-4 md:px-8">
        <section id="hero" className="mx-auto max-w-[980px] space-y-4 text-center">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
            Project initialized with shadcn/ui
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-7xl lg:leading-[1.1]">
            Experience Every Component.
          </h1>
          <p className="max-w-[750px] mx-auto text-xl text-muted-foreground">
            A complete preview of all installed shadcn/ui components, organized and interactive.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" onClick={() => toast.success("Explore the components below!")}>
              Start Exploring
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          
          {/* Section 1: General & Interactive */}
          <Section title="General & Buttons" icon={Box}>
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-4">
                  <Label>Button Variants</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Button Groups & Toggles</Label>
                  <div className="flex flex-wrap items-center gap-6">
                    <ButtonGroup>
                      <Button variant="outline">Left</Button>
                      <Button variant="outline">Middle</Button>
                      <Button variant="outline">Right</Button>
                    </ButtonGroup>

                    <Toggle aria-label="Toggle italic">
                      <Type className="size-4" />
                    </Toggle>

                    <ToggleGroup type="multiple" variant="outline">
                      <ToggleGroupItem value="bold" aria-label="Toggle bold">
                        <span className="font-bold">B</span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="italic" aria-label="Toggle italic">
                        <span className="italic">I</span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="underline" aria-label="Toggle underline">
                        <span className="underline">U</span>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Badges & Kbd</Label>
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge>New</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Critical</Badge>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Press</span>
                      <Kbd>⌘</Kbd>
                      <Kbd>S</Kbd>
                      <span className="text-sm text-muted-foreground">to save.</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Section 2: Form Controls */}
          <Section title="Forms & Inputs" icon={Type}>
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input placeholder="John Doe" />
                      <FieldDescription>Your full legal name.</FieldDescription>
                    </Field>
                  </FieldGroup>

                  <FieldGroup>
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>@</InputGroupAddon>
                        <InputGroupInput placeholder="email@example.com" />
                      </InputGroup>
                    </Field>
                  </FieldGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Framework</Label>
                    <Select defaultValue="next">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>React</SelectLabel>
                          <SelectItem value="next">Next.js</SelectItem>
                          <SelectItem value="remix">Remix</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>Vue</SelectLabel>
                          <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Search Tags (Combobox)</Label>
                    <Combobox>
                      <ComboboxTrigger className="w-full">
                        <ComboboxValue placeholder="Select tag..." />
                      </ComboboxTrigger>
                      <ComboboxContent>
                        <ComboboxInput placeholder="Search..." />
                        <ComboboxItem value="react">React</ComboboxItem>
                        <ComboboxItem value="vue">Vue</ComboboxItem>
                        <ComboboxItem value="svelte">Svelte</ComboboxItem>
                      </ComboboxContent>
                    </Combobox>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>One-Time Password</Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center space-x-2">
                    <Switch id="show-notifications" />
                    <Label htmlFor="show-notifications">Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Agree to terms</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Volume: 45%</Label>
                  </div>
                  <Slider defaultValue={[45]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Section 3: Feedback & Loading */}
          <Section title="Feedback & Loading" icon={AlertCircle}>
            <div className="space-y-6">
              <Alert>
                <Terminal className="size-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components to your app using the CLI.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>

              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Spinner />
                        Downloading assets...
                      </span>
                      <span className="font-medium text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>

                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia>
                        <Search className="size-12" />
                      </EmptyMedia>
                      <EmptyTitle>No results found</EmptyTitle>
                      <EmptyDescription>
                        We couldn&apos;t find anything matching your search.
                      </EmptyDescription>
                    </EmptyHeader>
                    <Button variant="outline" className="mt-4">
                      Clear Search
                    </Button>
                  </Empty>

                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Section 4: Navigation */}
          <Section title="Navigation" icon={Navigation}>
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-2">
                  <Label>Breadcrumb</Label>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Components</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="space-y-2">
                  <Label>Navigation Menu</Label>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <Link
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  <ImageIcon className="h-6 w-6" />
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    shadcn/ui
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Beautifully designed components built with Radix UI and Tailwind CSS.
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/docs">
                                  <div className="text-sm font-medium leading-none">Introduction</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Re-usable components built using Radix UI and Tailwind CSS.</p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/docs/installation">
                                  <div className="text-sm font-medium leading-none">Installation</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">How to install dependencies and structure your app.</p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/docs">
                          Documentation
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                <div className="space-y-2">
                  <Label>Pagination</Label>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Section 5: Overlays & Menus */}
          <Section title="Overlays & Menus" icon={MousePointer2}>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Modal Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modal Dialog Title</DialogTitle>
                        <DialogDescription>
                          A centered modal for important actions or information.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">Content goes here.</p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Continue</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Alert Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Delete Account</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Side Panel (Sheet)</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Settings</SheetTitle>
                        <SheetDescription>
                          Configure your app preferences.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-6 space-y-4">
                        <div className="space-y-1">
                          <Label>Theme</Label>
                          <NativeSelect>
                            <option>System</option>
                            <option>Light</option>
                            <option>Dark</option>
                          </NativeSelect>
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">Save changes</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Bottom Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                          <DrawerTitle>Task Complete</DrawerTitle>
                          <DrawerDescription>Your daily goals have been reached.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 flex flex-col items-center gap-4">
                          <div className="text-4xl font-bold">128</div>
                          <div className="text-sm text-muted-foreground">Calories burned today.</div>
                        </div>
                        <DrawerFooter>
                          <Button>Submit</Button>
                          <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"><HelpCircle className="size-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Help information</p>
                    </TooltipContent>
                  </Tooltip>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Popover Info</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Dimensions</h4>
                          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@shadcn</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@nextjs</h4>
                          <p className="text-sm">
                            The React Framework – created and maintained by @vercel.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>
                          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Edit</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Dropdown</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <ContextMenu>
                    <ContextMenuTrigger className="flex h-[80px] w-[200px] items-center justify-center rounded-md border border-dashed text-sm">
                      Right click here
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                      <ContextMenuItem inset>
                        Back
                        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuCheckboxItem checked>
                        Show Bookmarks Bar
                        <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                      </ContextMenuCheckboxItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Section 6: Layout & Data */}
          <Section title="Layout & Data" icon={Layers}>
            <div className="space-y-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>You made 265 sales this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">INV002</TableCell>
                            <TableCell>Pending</TableCell>
                            <TableCell className="text-right">$150.00</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Usage Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                              <CartesianGrid vertical={false} strokeDasharray="3 3" />
                              <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="desktop" fill="var(--primary)" radius={4} />
                              <Bar dataKey="mobile" fill="var(--secondary)" radius={4} />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design patterns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It uses CSS transitions for smooth height changes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="grid grid-cols-2 gap-4">
                <Collapsible className="space-y-2">
                  <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @radix-ui/primitives
                  </div>
                  <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                      @radix-ui/react-dom
                    </div>
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                      @radix-ui/react-dialog
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="space-y-4">
                  <Label>Image Aspect Ratio (16/9)</Label>
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <ImageIcon className="size-12" />
                    </div>
                  </AspectRatio>
                </div>
              </div>
            </div>
          </Section>

          {/* Section 7: Advanced Layout */}
          <Section title="Advanced Layout & Interaction" icon={Layout}>
            <div className="space-y-8">
              <div className="h-[200px] rounded-md border">
                <ResizablePanelGroup orientation="horizontal">
                  <ResizablePanel defaultSize={25}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">Sidebar</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">Content Area</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>

              <div className="space-y-4">
                <Label>Carousel</Label>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label>Scroll Area</Label>
                  <ScrollArea className="h-72 w-full rounded-md border p-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium leading-none">Tags</h4>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="text-sm">
                          v1.2.0-beta.{20 - i}
                          <Separator className="my-2" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="space-y-4">
                  <Label>Calendar Picker</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-fit mx-auto"
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container flex flex-col items-center justify-between gap-6 md:h-24 md:flex-row px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            <span className="font-bold">Shadcn Ultimate</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with shadcn/ui. Every component was generated and verified for this showcase.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Privacy</Button>
            <Button variant="ghost" size="sm">Terms</Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
