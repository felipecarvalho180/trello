import { Toaster } from "~/components";
import "./globals.css";

export const metadata = {
  title: "Trello 2.0",
  description: "Trello clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
