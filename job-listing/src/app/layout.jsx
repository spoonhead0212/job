'use client'

export default function RootLayout({mode, children}) {
  return (
    <html lang="en">
      <body>
        {mode}
        {children}
      </body>
    </html>
  )
}
