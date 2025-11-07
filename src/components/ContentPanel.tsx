import React from "react"

export function ContentPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-auto relative bg-sidebar m-2 ml-0 rounded-lg">
      {children}
    </div>
  )
}
