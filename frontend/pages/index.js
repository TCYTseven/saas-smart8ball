import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/TryIt";
import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import Head from "next/head";
import Pricing from "@/components/ui/Pricing";
import Testimonial from "@/components/ui/Testimonial";
import VisualFeatures from "@/components/ui/VisualFeatures";

export default function Home() {
  
  return (
    <>
    <Head>
      <title>smart8ball</title>
    </Head>
      <Hero />
      <FAQs />
      <Features />
      <Testimonial />
    </>
  );
}
//<VisualFeatures />
//      <CTA />
//      <Pricing />

