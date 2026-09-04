import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenítas — curadoria para celebrar",
  description: "Ideias, escolhas e produtos para celebrar do seu jeito.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}

