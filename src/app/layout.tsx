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
      <body>{children}</body>
    </html>
  );
}
