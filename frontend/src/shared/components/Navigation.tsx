"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/matching",  label: "Find Advisors" },
  { href: "/contracts", label: "Contracts" },
  { href: "/messaging", label: "Messages" },
  { href: "/reports",   label: "Reports" },
];

export function Navigation() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <nav className="p-4 space-y-1 flex flex-col h-full">
      <ul className="space-y-1 flex-1">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith(href)
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={logout}
        className="w-full text-left px-4 py-2 text-sm text-slate-400 hover:text-slate-100 rounded-md hover:bg-slate-800 transition-colors"
      >
        Sign out
      </button>
    </nav>
  );
}
