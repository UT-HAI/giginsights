import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
  title: "GigInsights",
  description: "Get insights into your Quest Data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <link
        rel="icon"
        href="/magnifyingglasscar.jpg"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
