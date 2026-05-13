import { Hero } from '../components/sections/Hero';
import { Pillars } from '../components/sections/Pillars';
import { HowItWorks } from '../components/sections/HowItWorks';
import { VendorStrip } from '../components/sections/VendorStrip';
import { FAQTeaser } from '../components/sections/FAQTeaser';
import { FinalCTA } from '../components/sections/FinalCTA';
import { homeFaqs } from '../data/faqs';

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <HowItWorks
        eyebrow="How it works"
        title="Three steps. That's it."
        subtitle="Scan once, order anywhere on campus, tap into your day."
      />
      <VendorStrip />
      <FAQTeaser faqs={homeFaqs} />
      <FinalCTA />
    </>
  );
}
