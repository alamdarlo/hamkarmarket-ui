import { toast } from "react-toastify";
import { Box, Button, CircularProgress, Modal, TextField } from "@mui/material";
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";
import { IRegisterForm } from "@/types/forms";
import { defaultRegisterForm } from "@/consts/defaultFormData";

const re = {
    'capital': /[A-Z]/,
    'digit': /[0-9]/,
    'except': /[aeiou]/,
    'full': /^[@#][A-Za-z0-9]{7,13}$/
};
export function RegisterModal() {
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors, isDirty },
    } = useForm<IRegisterForm>({ defaultValues: defaultRegisterForm });

    const onError = (data: any) => {
        debugger
    }
    const onsubmit = (data: any) => {
        try {

        } catch (error) {
            toast.error("خطایی رخ داده است لطفا بعدا دوباره تلاش کنید.");
        }
    };

    const validation = (val: any, pass: any): boolean => {
        return val == pass?._f?.value;
    }
    return (
        <div className="rounded flex justify-center items-center ">
            <div>
                <div className="text-center ">
                    <PersonAddAltSharpIcon sx={{ fontSize: 80 }} />
                </div>
                <h1>
                    <p className="text-center   text-xl">
                        <strong>ثبت نام كاربر</strong>
                    </p>
                </h1>
                <Box component="form" onSubmit={handleSubmit(onsubmit, onError)} className="">
                    <div className="grid grid-cols-12 grid-rows-5 h-fill" dir="ltr">
                        <div className=" grid grid-cols-subgrid col-span-12 row-start-4 content-start">
                            <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'نام کاربری اجباريست', min: { value: 3, message: 'نام كاربري بايد حداقل 3 حرف باشد' } }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        inputRef={ref}
                                        {...field}
                                        error={!!errors.username}
                                        helperText={errors.username?.message as string}
                                        label={"نام کاربری"}
                                        variant="standard"
                                        type="text"
                                        sx={{}}
                                        //className="grid  col-span-10 col-start-2 h-[72px]"
                                        className="text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className=" grid grid-cols-subgrid col-span-12 row-start-4 content-start">
                            <Controller
                                name="phoneNumber"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'شماره موبايل اجباريست', pattern: { value:/^(?:\+98|0)?9\d{9}$/,
                                //  RegExp("^09[0-9]{9}$"), 
                                 message: 'شماره موبايل  صحيح نمي باشد' } }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        inputRef={ref}
                                        // {...field}
                                        error={!!errors.phoneNumber}
                                        helperText={errors.phoneNumber?.message as string}
                                        type="tel"
                                        id="phoneNumber"
                                        label={"شماره موبايل"}
                                        variant="standard"
                                        sx={{}}
                                        //className="grid  col-span-10 col-start-2 h-[72px] "
                                        className="text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className=" grid grid-cols-subgrid col-span-12 row-start-4 content-start">
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'كلمه عبور اجباريست',
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message: 'كلمه عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر ویژه باشد'
                                    },
                                    min: { value: 6, message: 'كلمه عبور حداقل بايد شامل 6 كاراكتر باشد' }
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        inputRef={ref}
                                        //{...field}
                                        error={!!errors.password}
                                        helperText={errors.password?.message as string}
                                        id="password"
                                        type="password"
                                        label="رمز عبور"
                                        variant="standard"
                                        sx={{}}
                                        //className="grid  col-span-10 col-start-2 h-[72px] "
                                        className="text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className=" grid grid-cols-subgrid col-span-12 row-start-4 content-start">
                            <Controller
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'تكرار كلمه عبور اجباريست', min: { value: 4, message: 'تكرار كلمه عبور حداقل بايد شامل 6 كاراكتر باشد' },
                                    validate: (value: any) => validation(value, control._fields?.password) || 'تكرار كلمه عبور اشتباه است'
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        inputRef={ref}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message as string}
                                        id="confirmPassword"
                                        type="password"
                                        label="تكرار رمز عبور"
                                        variant="standard"
                                        sx={{}}
                                        //className="grid  col-span-10 col-start-2 h-[72px] "
                                        className="text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div className=" grid grid-cols-subgrid col-span-12 row-start-4 content-start">
                            <Controller
                                name="captchaText"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'حاصل عبارت اجباريست', 
                                    min: { value: 4, message: '2' },
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        inputRef={ref}
                                        error={!!errors.captchaText}
                                        helperText={errors.captchaText?.message as string}
                                        id="captchaText"
                                        type="password"
                                        label="كپچا"
                                        variant="standard"
                                        sx={{}}
                                        className="text-sm"
                                        //className="grid  col-span-10 col-start-2 h-[72px] "
                                    />
                                )}
                            />
                        </div>
                        <Button
                            variant="outlined"
                            size="small"
                            title="ثبت"
                            type="submit"
                            id="enter"
                            //onClick={handleSubmit2}
                            className="grid col-span-10 col-start-2 h-10 self-end"
                        >
                            ثبت

                        </Button>
                    </div>
                    <div className="grid grid-cols-12 grid-flow-row auto-rows-max row-span-full h-[72px]" >

                    </div>

                </Box>
            </div>
        </div>
    );
}
