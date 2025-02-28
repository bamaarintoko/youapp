'use client'
import InterestHeader from "@/components/InterestHeader";
import { useAuth } from "@/lib/hook/useAuth";
import { useFirestoreAddOrUpdate } from "@/lib/hook/useFirestoreAddOrUpdate";
import { useFirestoreListener } from "@/lib/hook/useFirestoreListener";
import { useEffect, useRef, useState } from "react";

interface InterestUser {
    tags: string[]
}

export default function PageInterest() {
    const { user } = useAuth(); // Get the logged-in user
    const [addOrUpdateInterest, { loading }] = useFirestoreAddOrUpdate<InterestUser>("interestUser");
    const { data: interestUser } = useFirestoreListener<InterestUser>("interestUser", user?.uid);
    const [tags, setTags] = useState<string[]>([]);

    // const { data } = useInterestUserListener();
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (interestUser) {
            setTags(interestUser?.tags)
        }
    }, [interestUser])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const tag = e.currentTarget.innerText.trim();
            if (tag && !tags.includes(tag)) {
                setTags([...tags, tag]);
                e.currentTarget.innerText = ""; // Clear input after adding tag
            }
        }
    };

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSaveInterest = async () => {
        try {
            if (user) {
                await addOrUpdateInterest(user.uid, { tags });
            }
        } catch (error) {
            console.log("error : ", error);

        }
    }
    return (
        <div>
            <InterestHeader onClick={handleSaveInterest} />
            <div className="px-6 pt-20">
                {
                    loading
                    &&
                    <div className="flex justify-center flex-col items-center">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <p className="text-white">loading</p>
                    </div>
                }
                <div className="px-3">

                    <p className="text-[14px] text-[#F3EDA6] font-bold">Tell everyone about yourself</p>
                    <p className="text-[20px] text-white font-bold">What interest you?</p>
                </div>

                <div
                    // style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    className="mt-6 w-full p-2 bg-white/[0.06] rounded-lg flex flex-wrap gap-2"
                    onClick={() => inputRef.current?.focus()}
                >
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="bg-white/10 text-white px-2 py-1 rounded-sm flex items-center"
                        >
                            <p className="text-[12px] font-semibold">

                                {tag}
                            </p>
                            <button
                                onClick={() => handleRemoveTag(index)}
                                className="ml-2 text-white hover:text-gray-300"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <div
                        ref={inputRef}
                        contentEditable
                        onKeyDown={handleKeyDown}
                        className="outline-none p-1 min-w-[100px] flex-grow relative text-white"
                        onBlur={(e) => e.currentTarget.focus()} // Keep focus even after clicking outside
                    />
                </div>
            </div>

        </div>
    )
}