import { getUserSession } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  CircleDollar,
  SquareChartBar,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {
  const session = await getUserSession();
  const user = session.user;

  console.log(user, session);

  const navItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const adminNavItems = [
    { icon: House, href: "/dashboard/admin/stats", label: "Statistics" },
    { icon: Magnifier, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: Person, href: "/dashboard/admin/users", label: "Users" },
    {
      icon: CircleDollar,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
    },
    {
      icon: SquareChartBar,
      href: "/dashboard/admin/analytics",
      label: "Analytics",
    },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {session?.role === "recruiter"
        ? navItems.map((item) => (
            <Link
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
              href={item.href}
            >
              <item.icon className="size-5 text-muted" />
              {item.label}
            </Link>
          ))
        : adminNavItems.map((item) => (
            <Link
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
              href={item.href}
            >
              <item.icon className="size-5 text-muted" />
              {item.label}
            </Link>
          ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
