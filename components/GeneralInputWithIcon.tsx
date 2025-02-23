import { ChangeEvent } from "react";

interface GeneralInputWithIconProps {
    right_label: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    // onChange: (value: string) => void;
}

// type HandleInputChange = (e: ChangeEvent<HTMLInputElement>) => void
export default function GeneralInputWithIcon({ right_label, placeholder, value, onChange }: GeneralInputWithIconProps) {

    return (
        <div className="relative">
            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer">
                <p className="text-white text-[13px]">{right_label}</p>
            </div>
            <input
                value={value}
                onChange={onChange}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                type={"text"} className={`text-right border border-white/20 pe-9 h-9 text-white text-sm rounded-lg block w-full`} placeholder={placeholder} required />
        </div>
    )
}