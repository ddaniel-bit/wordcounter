import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "./components/themeProvider";

const dmSans = localFont({
  src: [
    {
      path: "../../public/DMSans-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/DMSans-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <title>Word Counter App</title>
      <body className={`${dmSans.className} min-h-fit antialiased`}>
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
