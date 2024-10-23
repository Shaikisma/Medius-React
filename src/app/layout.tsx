import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple, Online Mortgage | Better Mortgage",
  description:
    "Better Mortgage Corporation is a direct lender dedicated to providing a fast, transparent digital mortgage experience backed by superior customer support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/8e8128172f928a73-s.p.woff" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/fa66006d93435331-s.p.woff" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/8cc2c808c54f2a2b-s.p.woff" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/c76c37b75ecbcb19-s.p.woff" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/166a7ef1422a0db4-s.p.woff" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/9a28dbd77205468a-s.p.woff" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/ee2e614727dab2d7-s.p.woff" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/7cc00d60d6e5b53e-s.p.woff" as="font" type="font/woff2" crossOrigin="anonymous"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
