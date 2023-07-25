import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface LayoutProps {
  title: string;
  children: ReactNode;
  isLogged?: boolean;
}

export const Layout = ({ title, children, isLogged }: LayoutProps) => {
  return (
    <main className="w-full flex flex-col items-center h-screen">
      <Helmet>
        <title>{title} :: WTDPOFE</title>
      </Helmet>
      <Header title={title} isLogged={isLogged} />
      <section className="w-full max-w-xl h-screen max-h-[86vh] mb-[52px] px-5 mt-28">
        {children}
      </section>
      <Footer />
    </main>
  );
};
