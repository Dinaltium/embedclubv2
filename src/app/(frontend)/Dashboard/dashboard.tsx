"use client"
import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/theme-toggle"
import { ContentPanel } from "@/components/ContentPanel"
import DecryptedTextProps from "@/components/DecryptedText"


export function SidebarShell({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="absolute right-8 top-6 z-40">
        <ModeToggle />
      </div>
      {children}
    </SidebarProvider>
  )
}

export function MainbarShell({ children }: { children?: React.ReactNode }) {

  return (
    <ContentPanel>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="font-montserrat text-center -translate-y-8">
          <div className="text-2xl md:text-3xl lg:text-4xl font-light mb-4">
            Welcome to
          </div>
          <div className="text-6xl md:text-7xl lg:text-8xl font-bold">
            <DecryptedTextProps text="EMBED CLUB" /> 
          </div>
        </div>
      </div>
      
      {children}
    </ContentPanel>
  )
}

