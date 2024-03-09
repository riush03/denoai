"use client";

import { SignOutButton, UserButton,UserProfile,useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { NavItem } from "./NavSection";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomSection({
  className,
  items,
}: {
  className?: string;
  items: NavItem[];
}) {
  const { isLoaded ,user } = useUser();
  const path = usePathname();
  return (
    <div className={className}>
      <div className="flex">
        <div className="ml-2.5 h-24 w-0.5 bg-slate-300 rounded-full"></div>
        <ul role="list" className="mt-1">
          {items.map((item, index) => {
            const Icon = Icons[item.icon];
            return (
              <Link
                className="flex items-center ml-4 my-3"
                key={index}
                href={item.href}
              >
                <span
                  className={cn(
                    path.includes(item.href) ? "bg-slate-800" : "bg-slate-300",
                    "absolute rounded-full h-2 w-2"
                  )}
                  style={{ marginLeft: "-21px" }}
                ></span>
                <Icon
                  width={20}
                  height={20}
                  strokeWidth={2.5}
                  className="inline-block stroke-slate-900"
                />
                <span
                  className={cn(
                    path === item.href ? "font-bold" : "font-medium",
                    "ml-2 text-slate-800"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
      <div
        className={cn(
          className,
          "flex items-center border rounded-md border-slate-200 py-3 px-2.5 -ml-2"
        )}
      >
        <div className="rounded-full bg-slate-900 h-10 w-10 flex flex-none items-center justify-center">
          <span className="text-slate-100 font-bold">
            <UserButton/>
          </span>
        </div>
        <span className="ml-2 text-slate-800 text-ellipsis overflow-hidden">
          {user?.firstName }
        </span>
        <div
          
          className="ml-auto p-2 hover:cursor-pointer hover:bg-slate-100 hover:rounded"
        >
          <SignOutButton/>
          <Icons.logout className="h-5 w-5 text-slate-800 hover:text-slate-600" />
        </div>
      </div>
    </div>
  );
}
