'use client'
// import { EyeIcon } from "@heroicons/react/20/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useState } from "react";

interface AuthInputProps {
    placeholder?: string;
    secure?: boolean;
    id: string;
    type: string;
    value: string;
    isError?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void


}
export default function AuthInput({ isError, placeholder, secure = false, id, type, value, onChange }: AuthInputProps) {
    const [secret, setScret] = useState(true)
    const [inputType, setInputType] = useState("password")


    useEffect(() => {
        setInputType(type)
    }, [])
    return (
        <div className="relative">
            {
                secure
                &&
                <div onClick={() => setScret(!secret)} className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer">
                    {
                        secret
                            ?
                            <EyeIcon className="size-6 text-white" />
                            :
                            <EyeSlashIcon className="size-6 text-white" />
                    }
                </div>
            }
            <input
                value={value}
                onChange={onChange}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                type={secret ? inputType : "text"} id={id} className={`${isError ? "border border-red-600" : "border-none"} px-2.5 h-12 text-white text-sm rounded-lg focus:outline-none block w-full`} placeholder={placeholder} required />
        </div>
    )
}