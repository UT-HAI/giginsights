import "./globals.css";

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
      <link
        rel="icon"
        href="/magnifyingglasscar.jpg"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body>{children}</body>
    </html>
  );
}
