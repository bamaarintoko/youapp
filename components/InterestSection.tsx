import Link from "next/link";
import EditPencil from "./EditPencil";
import { useInterestUserListener } from "@/lib/hook/useInterestUserLinster";

export default function InterestSection() {
    const {  data } = useInterestUserListener();

    return (
        <div className=" bg-[#0E191F] rounded-2xl py-4">
            <div className="flex pl-6 pr-4 pb-4">
                <div className="grow">

                    <p className="text-[14px] text-white font-bold">Interest</p>
                </div>
                <Link href="/interest">
                    <EditPencil />
                    {/* <PencilSquareIcon className="size-6 text-white"/> */}
                </Link>
            </div>
            <div className="px-6 flex gap-2 flex-wrap w-full">
                {
                    data
                    &&
                    data.tags.map((x, y) => (
                        <div key={y} className="bg-white/[0.06] py-2 px-4 rounded-full">
                            <p className="text-white text-[14px] font-semibold">{x}</p>
                        </div>
                    ))
                }
                {
                    !data &&
                    <p className="text-[14px] text-white/50">Add in your interest to find a better match</p>
                }
            </div>
        </div>
    )
}

