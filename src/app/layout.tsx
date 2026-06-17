import type { Metadata } from "next";
import "./site.css";

export const metadata: Metadata = {
  title: "Marathon Skills 2026",
  description: "Astana City Marathon 2026 — регистрация участников, результаты, маршрут",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
