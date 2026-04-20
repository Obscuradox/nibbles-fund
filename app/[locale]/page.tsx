import { TickerBar } from "@/components/TickerBar";
import { BloombergChyron } from "@/components/ui/BloombergChyron";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LiveHoldings } from "@/components/LiveHoldings";
import { Team } from "@/components/Team";
import { BoardOfAdvisors } from "@/components/BoardOfAdvisors";
import { Philosophy } from "@/components/Philosophy";
import { Performance } from "@/components/Performance";
import { EarningsCall } from "@/components/EarningsCall";
import { FilingsRoom } from "@/components/FilingsRoom";
import { TearSheet } from "@/components/TearSheet";
import { Timeline } from "@/components/Timeline";
import { InvestorGate } from "@/components/InvestorGate";
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
        <LiveHoldings />
        <Team />
        <BoardOfAdvisors />
        <Philosophy />
        <Performance />
        <EarningsCall />
        <FilingsRoom />
        <TearSheet />
        <Timeline />
        <InvestorGate />
        <FAQ />
      </main>
      <Footer />
      <AudioToggle />
    </EasterEggProvider>
  );
}
