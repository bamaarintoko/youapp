'use client'
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

export default function AddImage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        console.log('selectedFile : ', selectedFile)
    }, [selectedFile])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            {selectedFile && selectedFile.type.startsWith("image/") ? (
                <div onClick={handleButtonClick}>

                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="mt-2 size-14 object-cover rounded-lg"
                    />
                </div>
            ) :
                <div className="flex items-center space-x-4">
                    <div onClick={handleButtonClick} className="size-14 bg-white/10 rounded-2xl flex items-center justify-center">
                        <PlusIcon className="size-6 text-white" />
                    </div>
                    <p className="text-xs text-white">Add Image</p>
                </div>
            }


        </div>
    )
}