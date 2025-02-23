import { ChangeEvent } from "react";

interface SelectGenderProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}
export default function SelectGender({ value, onChange }: SelectGenderProps) {
    return (

        <select
            id="gender"
            value={value}
            onChange={onChange}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backgroundPosition: "right 1rem center" }}
            className="text-right border border-white/20 h-9 text-white text-sm rounded-lg block w-full pr-6"
        >
            <option value="" disabled>
                Choose a gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    )
}