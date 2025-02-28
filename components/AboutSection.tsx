'use client'
import EditPencil from "./EditPencil";
import AboutGeneralInput from "./AboutGeneralInput";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";

import GeneralInputWithIcon from "./GeneralInputWithIcon";
import DobInput from "./DobInput";
import { formatBirthday, getChineseZodiac, getZodiacSign } from "@/lib/functions";
import SelectGender from "./SelectGender";
import AddImage from "./AddImage";
import { auth } from "@/lib/firebaseConfig";
import Loading from "./Loading";
import { useFirestoreAddOrUpdate } from "@/lib/hook/useFirestoreAddOrUpdate";
import { useAuth } from "@/lib/hook/useAuth";
import { useFirestoreListener } from "@/lib/hook/useFirestoreListener";

type FormState = {
    [key: string]: {
        value: string;
        isError: boolean;
        message: string;
    };
};
type InputHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type SelectHandler = (e: ChangeEvent<HTMLSelectElement>) => void;
type InputHandlerWithField = (field: string) => (e: ChangeEvent<HTMLInputElement>) => void;

export interface AboutUser {
    name: string;
    birthday: string;
    gender: string;
    height: string;
    weight: string;
    horoscope: string;
    zodiac: string;
}

export default function AboutSection() {
    const { user } = useAuth(); // Get the logged-in user
    const [addOrUpdateAboutUser, { loading }] = useFirestoreAddOrUpdate<AboutUser>("aboutUser");
    const { data: aboutUser } = useFirestoreListener<AboutUser>("aboutUser", user?.uid);

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [form, setForm] = useState<FormState>({
        "name": {
            value: "",
            isError: false,
            message: ""
        },
        gender: {
            value: "",
            isError: false,
            message: ""
        },
        birthday: {
            value: "",
            isError: false,
            message: ""
        },
        horoscope: {
            value: "",
            isError: false,
            message: ""
        },
        zodiac: {
            value: "",
            isError: false,
            message: ""
        },
        "height": {
            value: "",
            isError: false,
            message: ""
        },
        "weight": {
            value: "",
            isError: false,
            message: ""
        },
    })

    const [formattedDob, setFormattedDob] = useState('')

    useEffect(() => { // listener about user
        if (aboutUser) {
            let formattedValue = aboutUser.birthday; //format birthday
            formattedValue = `${aboutUser.birthday.slice(0, 2)} ${aboutUser.birthday.slice(2, 4)} ${aboutUser.birthday.slice(4)}`;

            updateFormField("name", aboutUser.name)
            updateFormField("gender", aboutUser.gender)
            updateFormField("birthday", aboutUser.birthday)
            setFormattedDob(formattedValue)
            updateFormField("horoscope", aboutUser.horoscope)
            updateFormField("zodiac", aboutUser.zodiac)
            updateFormField("height", aboutUser.height)
            updateFormField("weight", aboutUser.weight)
        }
    }, [aboutUser]);

    useEffect(() => { // zodiac and horoscope auto fill from birthday
        if (form.birthday.value.length > 7) {
            const zodiacResult = getZodiacSign(form.birthday.value)
            const chinesZodiacResult = getChineseZodiac(form.birthday.value)
            updateFormField('zodiac', zodiacResult)
            updateFormField('horoscope', chinesZodiacResult)
        }
    }, [form.birthday.value])

    const updateFormField = ( //function for dynamic update state
        field: string,
        value: string
    ) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: {
                ...prevForm[field],
                value,
                isError: false,
                message: "",
            },
        }));
    };

    const handleDobChange: InputHandler = (e) => {
        let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

        if (input.length > 8) input = input.slice(0, 8); // Limit to 8 digits

        let formattedValue = input;

        if (input.length > 6) {
            formattedValue = `${input.slice(0, 2)} ${input.slice(2, 4)} ${input.slice(4)}`;
        } else if (input.length > 4) {
            formattedValue = `${input.slice(0, 2)} ${input.slice(2)}`;
        }

        setFormattedDob(formattedValue)
        updateFormField('birthday', input)
    };

    const handleInput: InputHandlerWithField = (field) => (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: {
                ...prevForm[field],
                value: e.target.value,
                isError: false,
                message: '',
            },
        }));
    }

    const handleInputMetric: InputHandlerWithField = (field) => (e) => {
        const input = e.target.value.replace(/\D/g, "");

        setForm((prevForm) => ({
            ...prevForm,
            [field]: {
                ...prevForm[field],
                value: input,
                isError: false,
                message: '',
            },
        }));
    }
    const handleSelectGender: SelectHandler = (e) => {
        updateFormField("gender", e.target.value)
    }

    const handleSaveAndUpdate = async () => {
        // setLoading(true)
        const par = {
            "name": form.name.value,
            gender: form.gender.value,
            birthday: form.birthday.value,
            horoscope: form.horoscope.value,
            zodiac: form.zodiac.value,
            "height": form.height.value,
            "weight": form.weight.value,
        }
        const user = auth.currentUser;
        try {
            if (user) {
                await addOrUpdateAboutUser(user.uid, par);
                setIsEdit(!isEdit)
                // setLoading(false)
                // console.log("User berhasil didaftarkan:");
            }

        } catch (error) {
            // setLoading(false)
            console.log('error : ', error)
            // console.log("User gagal didaftarkan:");

        }
    }
    return (
        <div className=" bg-[#0E191F] rounded-2xl py-4">
            <div className="flex pl-6 pr-4 pb-4">
                <div className="grow">

                    <p className="text-[14px] text-white font-bold">About</p>
                </div>
                <div>
                    {
                        loading
                        &&
                        <div>
                            <Loading />
                        </div>
                    }
                    {
                        !loading && isEdit
                        &&
                        <div className="flex items-center gap-2">
                            <div onClick={handleSaveAndUpdate} className="cursor-pointer">

                                <p className="text-[12px] text-white">Save & Update</p>
                            </div>
                            <p className="text-white">|</p>
                            <div onClick={() => setIsEdit(!isEdit)} className="cursor-pointer">

                                <p className="text-[12px] text-white">Cancel</p>
                            </div>
                        </div>


                    }
                    {
                        !loading && !isEdit
                        &&
                        <div className="cursor-pointer" onClick={() => setIsEdit(!isEdit)}>

                            <EditPencil />
                        </div>
                    }
                    {/* <PencilSquareIcon className="size-6 text-white"/> */}
                </div>
            </div>
            {
                aboutUser && !isEdit
                &&
                <DisplayAbout data={aboutUser} />
            }
            <div className="px-6">
                {
                    !aboutUser && !isEdit
                    &&
                    <p className="text-[14px] text-white/50">Add in your your to help others know you
                        better</p>
                }

                {
                    isEdit
                    &&
                    <div className="space-y-[12px]">
                        <AddImage />

                        <Menu label="Display Name :" component={<AboutGeneralInput placeholder="Enter name" value={form.name.value} onChange={handleInput("name")} />} />
                        <Menu label="Gender :" component={<SelectGender value={form.gender.value} onChange={handleSelectGender} />} />
                        <Menu label="Birthday :" component={<DobInput value={formattedDob} onChange={handleDobChange} />} />
                        <Menu label="Horoscope :" component={<AboutGeneralInput disable={true} value={form.horoscope.value} placeholder="--" />} />
                        <Menu label="Zodiac :" component={<AboutGeneralInput disable={true} value={form.zodiac.value} placeholder="--" />} />
                        <Menu label="Height :" component={<GeneralInputWithIcon value={form.height.value} onChange={handleInputMetric("height")} right_label="Cm" placeholder="add height" />} />
                        <Menu label="Weight :" component={<GeneralInputWithIcon value={form.weight.value} onChange={handleInputMetric("weight")} right_label="Kg" placeholder="add weight" />} />
                    </div>
                }
            </div>
        </div>
    )
}

interface InterMenu {
    label: string,
    component: ReactElement
}

const Menu = ({ label, component }: InterMenu) => {
    return (
        <div className="flex">

            <div className="w-28 flex items-center">
                <p className="text-[12px] text-white/30">{label}</p>
            </div>
            <div className="flex-1">
                {component}
                {/* <AboutGeneralInput /> */}
            </div>
        </div>
    )
}

interface InterDisplayMenu {
    label: string
    value: string
}
const DisplayMenu = ({ label, value }: InterDisplayMenu) => {
    return (

        <div className="flex">
            <div>
                <p className="text-[13px] text-white/30">{label} : &nbsp;</p>
            </div>
            <div>
                <p className="text-[13px] text-white">{value}</p>
            </div>
        </div>
    )
}
interface InterDisplayAbout {
    data: AboutUser
}
const DisplayAbout = ({ data }: InterDisplayAbout) => {
    return (

        <div className="px-6 space-y-2">
            <DisplayMenu label="Birthday" value={formatBirthday(data.birthday)} />
            <DisplayMenu label="Horoscope" value={data.horoscope} />
            <DisplayMenu label="Zodiac" value={data.zodiac} />
            <DisplayMenu label="Height" value={`${data.height} cm`} />
            <DisplayMenu label="Weight" value={`${data.weight} kg`} />
        </div>
    )
}