import { Button } from "@/Components/ui"
import { Link } from "react-router-dom"

const PremiumCard = () => {
    return (
        <div className="flex flex-col text-white border border-purple-one p-4 rounded-[20px] shadow-2xl items-center">
            <h3 className="text-[20px] font-semibold mb-1">
                Subscribe to Premium
            </h3>
            <p className="text-[16px] mb-2">
                Subscribe to unlock new features.
            </p>
            <Link to="/Premium">
                <Button className="bg-purple-one">Subscribe</Button>
            </Link>
        </div>
    )
}

export default PremiumCard