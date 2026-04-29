import { TickerBar } from "@/components/TickerBar";
import { BloombergChyron } from "@/components/ui/BloombergChyron";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { MemeGallery } from "@/components/MemeGallery";
import { LiveHoldings } from "@/components/LiveHoldings";
import { Team } from "@/components/Team";
import { BoardOfAdvisors } from "@/components/BoardOfAdvisors";
import { Philosophy } from "@/components/Philosophy";
import { Performance } from "@/components/Performance";
import { FilingsRoom } from "@/components/FilingsRoom";
import { TearSheet } from "@/components/TearSheet";
import { Timeline } from "@/components/Timeline";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { EasterEggProvider } from "@/lib/easterEggs";

export default function Home() {
  return (
    <EasterEggProvider>
      <TickerBar />
      <BloombergChyron />
      <Nav />
      <main>
        <Hero />
        <VideoSection />
        <LiveHoldings />
        <Team />
        <BoardOfAdvisors />
        <Philosophy />
        <Performance />
        <FilingsRoom />
        <TearSheet />
        <Timeline />
        <FAQ />
        <MemeGallery />
      </main>
      <Footer />
      <AudioToggle />
    </EasterEggProvider>
  );
}
