import { logoutUser } from "@/lib/firebase/logOut";
import { useUserData } from "@/lib/hook/useUserData";
import { ChevronLeftIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

export default function HomeHeader() {
    const { userData } = useUserData();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // console.log("asdad")
            if (dropdownRef.current && event.target instanceof Node && dropdownRef.current.contains(event.target) === false) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            //   router.push("/login"); // Redirect to login
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-16  justify-center items-center px-4">
            <div className="flex items-center w-16 cursor-pointer">
                <ChevronLeftIcon className="size-6 text-white" />
                <p className="text-white text-[14px] font-bold">Back</p>
            </div>
            <div className="flex grow items-center justify-center">
                {
                    userData
                    &&
                    <p className="font-bold text-white text-[14px]">@{userData.username}</p>
                }
            </div>
            <div ref={dropdownRef} className="w-16 flex items-end justify-end relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className="focus:outline-none"
                >
                    <EllipsisHorizontalIcon className="size-6 text-white" />
                </button>
                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 z-10 flex bg-[#1F4247] divide-y divide-gray-100 rounded-lg shadow-lg w-44 ">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li >
                                <div onClick={handleLogout} className="block px-4 py-2 cursor-pointer">
                                    <p>Sign Out</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}