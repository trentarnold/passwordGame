import "./globals.css"

export const metadata = {
  title: 'The Adventurers Plight',
  description: 'Lock your deepest secrets with the ultimate password',
}

export default function RootLayout ( { children } ) {
  return (
    <html lang="en">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Roboto+Mono' rel='stylesheet' />
      </head>
      <body>{children}</body>
    </html>
  )
}
