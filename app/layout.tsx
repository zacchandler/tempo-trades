import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tempo Trades — Master ICT Strategy & Make $10k/mo+",
  description:
    "Join 400+ traders learning a proven ICT strategy with live daily trading, personal mentorship, and a winning community. Start your free 7-day trial.",
  openGraph: {
    title: "Tempo Trades — Master ICT Strategy",
    description:
      "A simple exposed ICT strategy making $10k/mo+ consistently. Live trading, mentorship, 400+ students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
