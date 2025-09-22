'use client'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import LockResetIcon from '@mui/icons-material/LockReset';

import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IChangePasswordForm } from '../types';
import { defaultChangepasswordForm } from '../consts/defaultForms';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CaptchaImg from '@/components/ui/CaptchaImg';
import { CaptchaHandle } from '@/types/commonTypes';

export default function ChangePassword() {
    const captchaRef = useRef<CaptchaHandle>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        getFieldState,
        setError,
        formState: { errors, isValid },
    } = useForm<IChangePasswordForm>({ defaultValues: defaultChangepasswordForm, mode: 'all', reValidateMode: 'onBlur' });
    let password = watch("password", "");

    const onSubmit = async (data: IChangePasswordForm) => {
        if (captchaRef.current) {

            const captchaKey = captchaRef.current.getCaptchaKey();
        }
    }
    return (
        <div className=" rounded-lg shadow-sm border border-gray-200">
            <div>
                <div className="text-center flex justify-center mt-2">
                    <LockResetIcon className="size-20 mr-2 flex text-9xl" sx={{ fontSize: '6rem' }} fontWeight={10} />
                </div><strong className='flex justify-center text-2xl pr-5'>تغيير رمز عبور </strong>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 grid-rows-5 mt-5 bg-white" >
                    <div className="grid col-span-10 col-start-2 h-[72px]" >
                        <div className="grid col-span-10 col-start-2 h-[72px]">
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message: 'كلمه عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر ویژه باشد'
                                    },
                                    required: ' كلمه عبور اجباريست',
                                    min: { value: 4, message: '2' },
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        error={!!errors.password}
                                        helperText={errors.password?.message as string}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        label="كلمه عبور"
                                        size="small"
                                        slotProps={{
                                            input: {
                                                sx: { borderRadius: 100, padding: '1px 0px' },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            aria-label={
                                                                showPassword ? 'hide the password' : 'display the password'
                                                            }
                                                            onClick={handleClickShowPassword}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                        {/* <LucideLock /> */}
                                                    </InputAdornment>
                                                ),
                                            },

                                            inputLabel: {
                                                shrink: true,
                                                sx: { fontSize: '20px' }
                                            },
                                        }}
                                        variant="outlined"
                                        sx={{}}
                                    />
                                )}
                            />
                        </div>

                        <div className="grid col-span-10 col-start-2 h-[72px]">
                            <Controller
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                rules={{
                                    validate: (value) => {
                                        if (value !== watch("password")) {
                                            return "تكرار كلمه عبور اشتباه است"; // Return error message if passwords don't match
                                        }
                                        return true; // Return true if they match
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message: 'كلمه عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر ویژه باشد'
                                    },
                                    required: ' تكرار كلمه عبور اجباريست'
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message as string}
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        label="تكرار كلمه عبور"
                                        size="small"
                                        slotProps={{
                                            input: {
                                                sx: { borderRadius: 100, padding: '1px 0px' },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            aria-label={
                                                                showConfirmPassword ? 'hide the password' : 'display the password'
                                                            }
                                                            onClick={handleClickShowConfirmPassword}
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                        {/* <LucideLock /> */}
                                                    </InputAdornment>
                                                ),
                                            },

                                            inputLabel: {
                                                shrink: true,
                                                sx: { fontSize: '20px' }
                                            },
                                        }}
                                        variant="outlined"
                                        sx={{}}
                                    />
                                )}
                            />
                        </div>

                        <div className="grid col-span-10 col-start-2 h-11 bg-gray-50" dir='ltr' >
                            <CaptchaImg ref={captchaRef} />
                        </div>

                        <div className="grid col-span-10 col-start-2 h-14 bg-gray-100 border border-gray-300 rounded-full mt-9">
                            <Button
                                type="submit"
                                size='large'
                                loading={loading}
                                loadingPosition="center"
                                variant="outlined"
                                sx={{ borderRadius: 100 }}
                                className="border border-gray-300 rounded-full"
                            >
                                <span className="text-3xl">ثبت</span>
                            </Button>
                        </div>

                    </div>
                </Box>
            </div>

        </div>
    )
}
