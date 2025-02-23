'use client'
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
interface InterestHeaderProps {
    onClick: () => void;
}
export default function InterestHeader({ onClick }: InterestHeaderProps) {
    const router = useRouter()
    return (
        <div className="flex h-16  justify-center items-center px-4">
            <div onClick={() => router.back()} className="flex items-center w-16 ">
                <ChevronLeftIcon className="size-6 text-white" />
                <p className="text-white text-[14px] font-bold">Back</p>
            </div>
            <div className="flex grow items-center justify-center">

                {/* <p className="font-bold text-white text-[14px]">@johndoe</p> */}
            </div>
            <div onClick={onClick} className="w-16 flex items-end justify-end cursor-pointer">
                <p className="text-white text-[14px] font-bold">Save</p>
                {/* <EllipsisHorizontalIcon className="size-6 text-white" /> */}
            </div>
        </div>
    )
}