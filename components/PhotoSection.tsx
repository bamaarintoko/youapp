import { useUserData } from "@/lib/hook/useUserData"

export default function PhotoSection() {
    const { userData } = useUserData()
    return (
        <div className="w-full h-48 bg-[#162329] rounded-2xl items-end flex p-4">
            {
                userData
                &&
                <p className="text-[16px] font-bold text-white">@{userData.username},</p>
            }
        </div>
    )
}