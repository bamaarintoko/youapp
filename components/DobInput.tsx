import { ChangeEvent } from "react"

interface DobInput {
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
// type InputHandler = (e: ChangeEvent<HTMLInputElement>) => void;
export default function DobInput({ value, onChange }: DobInput) {
    return (
        <div>
            <input
                value={value}
                onChange={onChange}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                type={"text"} className={`text-right border border-white/20 px-2.5 h-9 text-white text-sm rounded-lg block w-full`} placeholder="DD MM YYYY" required />
        </div>
    )
}