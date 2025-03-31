import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "@/components/herosection";
import HotDeals from "@/components/HotDeals";
import PopularLeaseDeals from "@/components/PopularLeaseDeals";
import HotCarDeals from "@/components/HotCarDeals";

export default function Home() {
  return (
    <div className="home-container">
    
    <HotDeals/>
    <PopularLeaseDeals/>
    <HotCarDeals/>
    </div>
  );
}
