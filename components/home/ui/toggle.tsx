"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900" />
    );
  }

  const dark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 transition hover:border-emerald-500 hover:text-emerald-400"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
