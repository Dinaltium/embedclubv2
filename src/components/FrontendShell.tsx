"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { ContentPanel } from "@/components/ContentPanel";

export function SidebarShell({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Sidebar itself */}
      <AppSidebar />

      {/* Top-right Dark Mode Toggle */}
      <div className="absolute right-8 top-6 z-40">
        <ModeToggle />
      </div>

      {/* Render inner content */}
      {children}
    </SidebarProvider>
  );
}

export function MainbarShell({ children }: { children?: React.ReactNode }) {
  return (
    <ContentPanel>
      <div className="h-full w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </ContentPanel>
  );
}

/**
 * If you ever want a single wrapper combining both (useful for smaller pages),
 * you can export this too. Optional.
 */
export default function FrontendShell({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarShell>
      <MainbarShell>{children}</MainbarShell>
    </SidebarShell>
  );
}
