'use client'
import AuthButton from "@/components/AuthButton";
import AuthInput from "@/components/AuthInput";
import withNoAuth from "@/hoc/withNoAuth";
// import { useLoginWithUsernameOrEmail } from "@/lib/firebase/loginWithUsernameOrEmail";
// import { loginWithUsernameOrEmail } from "@/lib/firebase/loginWithUsernameOrEmail";
import { cekEmpty } from "@/lib/functions";
import { useLoginWithUsernameOrEmail } from "@/lib/hook/useLoginWithUsernameOrEmail";
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
function PageLogin() {
    const [login, { loading, error }] = useLoginWithUsernameOrEmail()
    const [form, setForm] = useState<FormState>({
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
    })
    // const [isLoginFailied, setIsLoginFailed] = useState<boolean>(false)
    // const [message, setMessage] = useState<string>("")
    // const [isLoading, setIsLoading] = useState<boolean>(false)
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

    const handleLogin = async () => {
        // setIsLoading(true)
        const hasError = cekEmpty(form)

        if (hasError) {
            // ❌ Form has errors, run validate form for change state isError
            validateForm()
        } else {
            // ✅ no error
            try {
                await login(form.username.value, form.password.value);
                // console.log("Login berhasil:", user);
                // setIsLoading(false)
            } catch (err) {
                updateFormField("username")
                updateFormField("password")
                // validateForm()
                // setIsLoginFailed(true)
                // setIsLoading(false)
                // setMessage(String(err))
                console.log(err);
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
                <p className="text-xl text-white font-bold">Login</p>
            </div>
            <div className="px-6 space-y-3">

                <AuthInput isError={form.username.isError} value={form.username.value} onChange={handleInput('username')} type="text" id="Email" placeholder="Enter Username/Email" />
                <AuthInput isError={form.password.isError} value={form.password.value} onChange={handleInput('password')} type="password" id="Password" secure={true} placeholder="Enter Password" />
                <div className="h-1" />
                {
                    error
                    &&
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                        {error}.
                    </div>
                }
                <AuthButton isLoading={loading} onClick={handleLogin} label="Login" />
            </div>
            <div className="flex items-center justify-center mt-10">
                <p className="text-white text-[13px]">No Account? &nbsp;</p>
                <Link href="/auth/register">
                    <p className="underline text-[13px] text-[#F3EDA6]">Register here</p>
                </Link>
            </div>
        </div>
    )
}

export default withNoAuth(PageLogin)