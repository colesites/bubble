"use client"

import PremiumCard from "./PremiumCard";
import WhoToFollow from "./WhoToFollow";

function RightSidebar() {
    return(
        <section className="rightsidebar">
            <PremiumCard />
            <WhoToFollow />
        </section>
    );
}

export default RightSidebar;