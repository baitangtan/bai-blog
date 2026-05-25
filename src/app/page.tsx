import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bai - Personal Blog",
};

export default function Home() {
  return (
    <>
      <Nav />
      <div id="skip-nav">
        <main>
          <Hero />
        </main>
      </div>
      <Footer />
    </>
  );
}
