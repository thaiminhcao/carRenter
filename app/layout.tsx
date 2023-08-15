import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Car Renter",
  description: "Best application to rent car",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
