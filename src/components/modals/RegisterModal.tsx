import { toast } from "react-toastify";
import {Box, Button, CircularProgress, Modal, TextField} from "@mui/material";
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";

export type IRegisterModalProps = {
    open: boolean;
    handleRegisterModalOpen: () => void;
    isLoginResultSuccess: (e: boolean) => void;
};
export function RegisterModal(modalProps: IRegisterModalProps) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        reset();
        setLoading(false);
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const closeRegisterModal = () => {
        debugger
        reset();
        modalProps.handleRegisterModalOpen();
    }
    const onError = (data: any) => {
        debugger
        //console.log(data)
    }
    const onsubmit = (data: any) => {
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log("Login failed:", error);
            toast.error("خطایی رخ داده است لطفا بعدا دوباره تلاش کنید.");
            modalProps.isLoginResultSuccess(false);
        }
    };

    const validation = (val: any, pass: any): boolean => {
        return val == pass?._f?.value;
    }
    return (
        <Modal
            className="flex w-fulljustify-center items-center place-content-center h-full"
            open={modalProps.open}
            onClose={closeRegisterModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="bg-white rounded-md w-full h-full md:w-[500px] md:h-[550px] ">

                <p className=""><span className="cursor-pointer px-3 text-red-500" onClick={closeRegisterModal} >&times;</span></p>
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
                                    sx={{ }}
                                    className="grid  col-span-10 col-start-2 h-[72px]"
                                />
                            )}
                        />
                        <Controller
                            name="phoneNo"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'شماره موبايل اجباريست', pattern: { value: RegExp("^09[0-9]{9}$"), message: 'شماره موبايل  صحيح نمي باشد' } }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                  inputRef={ref}
                                    // {...field}
                                    error={!!errors.phoneNo}
                                    helperText={errors.phoneNo?.message as string}
                                    type="tel"
                                    id="phoneNo"
                                    label={"شماره موبايل"}
                                    variant="standard"
                                    sx={{ }}
                                    className="grid  col-span-10 col-start-2 h-[72px] "
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'كلمه عبور اجباريست', min: { value: 4, message: 'كلمه عبور حداقل بايد شامل 4 كاراكتر باشد' } }}
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
                                    sx={{ }}
                                    className="grid  col-span-10 col-start-2 h-[72px] "
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'تكرار كلمه عبور اجباريست', min: { value: 4, message: 'تكرار كلمه عبور حداقل بايد شامل 4 كاراكتر باشد' },
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
                                    sx={{ }}
                                    className="grid  col-span-10 col-start-2 h-[72px] "
                                />
                            )}
                        />

                        <Button
                            variant="outlined"
                            size="small"
                            title="ثبت"
                            type="submit"
                            id="enter"
                            disabled={loading}
                            //onClick={handleSubmit2}
                            className="grid col-span-10 col-start-2 h-10 self-end"
                        >
                            ثبت
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Button>
                    </div>
                    <div className="grid grid-cols-12 grid-flow-row auto-rows-max row-span-full h-[72px]" >

                    </div>

                </Box>
            </div>
        </Modal>
    );
}
