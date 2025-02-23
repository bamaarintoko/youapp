import { ChangeEvent } from "react";

interface AboutGeneralInputProps {
    placeholder?: string;
    secure?: boolean;
    id?: string;
    value: string;
    isError?: boolean;
    disable?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void


}
export default function AboutGeneralInput({ placeholder, id, value, onChange, disable=false }: AboutGeneralInputProps) {
    return (
        <div>
            <input
                value={value}
                onChange={onChange}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                id={id}
                // readOnly
                disabled={disable}
                type={"text"} className={`text-right border border-white/20 px-2.5 h-9 text-white text-sm rounded-lg block w-full`} placeholder={placeholder} required />
        </div>
    )
}