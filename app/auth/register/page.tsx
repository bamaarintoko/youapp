'use client'
import AuthButton from "@/components/AuthButton";
import AuthInput from "@/components/AuthInput";
import withNoAuth from "@/hoc/withNoAuth";
import { registerUser } from "@/lib/firebase/addUser";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

type FormState = {
    [key: string]: {
        value: string;
        isError: boolean;
        message: string;
    };
};
type InputHandler = (field: string) => (e: ChangeEvent<HTMLInputElement>) => void;

function PageRegister() {
    const [form, setForm] = useState<FormState>({
        email: {
            value: '',
            isError: false,
            message: ''
        },
        username: {
            value: '',
            isError: false,
            message: ''
        },
        password: {
            value: '',
            isError: false,
            message: ''
        },
        confirm_password: {
            value: '',
            isError: false,
            message: ''
        }
    })

    const [isRegisterFailed, setIsRegisterFailed] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const cekEmpty = () => {
        return Object.values(form).some(field => field.value.trim() === '');
    };
    const handleInput: InputHandler = (field) => (e) => {
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

    const handleRegister = async () => {
        setIsLoading(true)
        const hasErrors = cekEmpty();
        validateForm()
        if (hasErrors) {
            // ❌ Form has errors, run validate form for change state isError
            validateForm()
            setIsLoading(false)
        } else {
            // ✅ no error
            if (validatePasswordMatch(form.password.value, form.confirm_password.value)) {
                setIsRegisterFailed(false)
                setMessage("")
                const par = {
                    email: form.email.value,
                    username: form.username.value,
                    password: form.password.value
                }
                try {
                    await registerUser(par);
                    // console.log("User berhasil didaftarkan:", user);
                    setIsLoading(false)
                } catch (err) {
                    setIsRegisterFailed(true)
                    setMessage(String(err))
                    setIsLoading(false)
                    console.log('errooooor : ', (err))
                    // setError(err.message);
                }
            } else {
                setIsRegisterFailed(true)
                setMessage("password missmatch")
                updateFormField('password')
                updateFormField('confirm_password')
                console.log('not match')
            }
        }
    }
    const updateFormField = ( //function for dynamic update state
        field: string,
    ) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: {
                ...prevForm[field],
                isError: true,
                message: "",
            },
        }));
    };
    const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
        return password === confirmPassword;
    };

    const validateForm = () => {
        let hasErrors = false;

        setForm(prevForm => {
            const updatedForm = { ...prevForm };

            Object.keys(updatedForm).forEach(key => {
                const { value } = updatedForm[key];

                if (value.trim() === '') {
                    updatedForm[key] = {
                        ...updatedForm[key],
                        isError: true,
                        message: 'This field is required',
                    };
                    hasErrors = true;
                } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    updatedForm[key] = {
                        ...updatedForm[key],
                        isError: true,
                        message: 'Invalid email format',
                    };
                    hasErrors = true;
                } else {
                    updatedForm[key] = {
                        ...updatedForm[key],
                        isError: false,
                        message: '',
                    };
                }
            });

            return updatedForm;
        });

        return hasErrors;
    };

    return (
        <div>
            <div className="px-10 pb-4 pt-36">
                <p className="text-xl text-white font-bold">Register</p>
            </div>
            <div className="px-6 space-y-3">

                <AuthInput isError={form.email.isError} value={form.email.value}
                    onChange={handleInput('email')}
                    type="text" id="Username" placeholder="Enter Email" />
                <AuthInput
                    isError={form.username.isError}
                    value={form.username.value}
                    onChange={handleInput('username')}
                    type="text" id="Email" placeholder="Create Username" />
                <AuthInput
                    isError={form.password.isError}
                    value={form.password.value}
                    onChange={handleInput('password')}
                    type="password" id="Password" secure={true} placeholder="Create Password" />
                <AuthInput
                    isError={form.password.isError}
                    value={form.confirm_password.value}
                    onChange={handleInput('confirm_password')}
                    type="password" id="Confirm Password" secure={true} placeholder="Confirm Password" />
                <div className="h-1" />
                {
                    isRegisterFailed
                    &&
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                        {message}.
                    </div>
                }
                <AuthButton isLoading={isLoading} onClick={handleRegister} label="Register" />
            </div>
            <div className="flex items-center justify-center mt-10">
                <p className="text-white text-[13px]">Have an Account? &nbsp;</p>
                <Link href="/auth/login">
                    <p className="underline text-[13px] text-[#F3EDA6]"> Login here</p>
                </Link>
            </div>
        </div>
    )
}

export default withNoAuth(PageRegister)