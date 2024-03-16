import { SideNav } from "@/components/Siderbar";
import Header from "@/components/Navbar";
import { NavSection } from "@/components/NavSection";
import { NavSectionItems } from "@/components/NavSection";

const pipelines: NavSectionItems = {
  label: "Pipelines",
  icon: "layers",
  items: [
    {
      label: "Text Recognition",
      href: "/textrecognition",
      icon: "textSelect",
    },
    {
      label: "Data Extraction",
      href: "/dataextraction",
      icon: "braces",
    },
    {
      label: "Verification",
      href: "/verification",
      icon: "checkCircle",
    },
  ],
};

const organizedData: NavSectionItems = {
  label: "Oragnized Data",
  icon: "grid",
  items: [
    {
      label: "Receipts",
      href: "/receipts",
      icon: "receipt",
    },
    {
      label: "Invoices",
      href: "/invoices",
      icon: "invoice",
    },
    {
      label: "Card Statements",
      href: "/card-statements",
      icon: "creditCard",
    },
  ],
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
       <aside className="w-full gap-8">
          <Header />
        </aside>
      <div className="flex gap-8">
        
      <div className="flex flex-1 flex-col gap-8">
        <NavSection className="mt-20" section={pipelines} />
        <NavSection className="mt-10" section={organizedData} />
        <SideNav/>
      </div>
        <div className="w-full">
             {children}
        </div>
      </div>
    </main>
  );
}
