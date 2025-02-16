import type { Metadata } from "next";
import "./globals.css";
import LocalFont from "next/font/local"
const poppinsSans = LocalFont({
 src: [
     {path: "/fonts/Poppins-Regular.ttf", weight: "400", style: "normal", },
     {path: "/fonts/Poppins-Medium.ttf", weight: "500", style: "normal", },
     {path: "/fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal", },
     {path: "/fonts/Poppins-Bold.ttf", weight: "700", style: "normal", },
 ]
});

const latoSans = LocalFont({
 src: [
     {path: "/fonts/Lato-Regular.ttf", weight: "400", style: "normal", },
     {path: "/fonts/Lato-Bold.ttf", weight: "700", style: "normal", },
 ]
});

export const metadata: Metadata = {
  title: "Strimz | Virtual Cinema",
  description: "Online Cinema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.className} ${latoSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
