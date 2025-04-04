import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "@/components/herosection";
import HotDeals from "@/components/SponsoredAds";
import PopularLeaseDeals from "@/components/PopularLeaseDeals";
import HotCarDeals from "@/components/HotCarDeals";
import FilterPage from "@/components/FilterPage";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HotDeals />
      <FilterPage />
     </div>
  );
}
