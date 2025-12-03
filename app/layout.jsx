import './globals.css'
import React from "react";


export const metadata = { title: 'Guardian Dashboard — AI demo' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
