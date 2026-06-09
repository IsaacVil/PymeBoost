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
                  ? "bg-teal-500/10 text-teal-600"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={logout}
        className="w-full text-left px-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 rounded-md hover:bg-zinc-100 transition-colors"
      >
        Sign out
      </button>
    </nav>
  );
}
