import { useEffect, useState } from "react";
import { Controller, Message, useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Modal,
  TextField,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { green } from "@mui/material/colors";
import { toast } from "react-toastify";


export type ISignInModalProps = {
  open: boolean;
  handleProfileMenuOpen: () => void;
  handleRegisterMenuOpen?: () => void;
  isLoginResultSuccess: (e: boolean) => void;
};
export function SignInModal(modalProps: ISignInModalProps) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  useEffect(() => {
    reset();
    setLoading(false);
  }, [modalProps.open]);

  const onsubmit = async (eror: any) => {
    try {
      //console.log(eror)
      debugger
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      modalProps.isLoginResultSuccess(true);
      
    } catch (error: any) {
      debugger
      console.log("Login failed:", error);
      toast.error("خطایی رخ داده است لطفا بعدا دوباره تلاش کنید.");
      //modalProps.isLoginResultSuccess(false);
    }
  };

  return (
    <Modal
      className=" flex w-fulljustify-center items-center place-content-center h-full"
      open={modalProps.open}
      onClose={modalProps.handleProfileMenuOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="bg-white rounded-md w-full h-full md:w-[500px] md:h-[450px] ">
        {/* <div className="bg-white rounded-md grid col-span-4 col-start-5 lg:col-span-3 lg:col-start-5 h-[500px] "> */}
        <div>
          <p className=""><span className="cursor-pointer px-3 text-red-500" onClick={modalProps.handleProfileMenuOpen} >&times;</span></p>
          <div className="text-center ">
            <AccountCircleRoundedIcon sx={{ fontSize: 80 }} />
          </div>
          <h1>
            <p className="text-center   text-xl">
              <strong>ورود كاربر</strong>
            </p>
          </h1>

          <Box component="form" onSubmit={handleSubmit(onsubmit)} className="grid grid-cols-12 grid-rows-5">
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: 'نام کاربری اجباريست', min: { value: 3, message: 'نام کاربری بايد حداقل 3 حرف باشد؟' } }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.username}
                  helperText={errors?.username?.message as Message | undefined}
                  id="username"
                  label={"نام کاربری"}
                  variant="standard"
                  type="text"
                  sx={{ }}
                  className="grid  col-span-10 col-start-2 h-[72px]"
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
                  {...field}
                  error={!!errors?.password}
                  helperText={errors?.password?.message as Message | undefined}
                  id="password"
                  type="password"
                  label="رمز عبور"
                  variant="standard"
                  sx={{ }}
                  className="grid  col-span-10 col-start-2 h-[72px] "
                />
              )}
            />
            <div className=" grid grid-cols-subgrid col-span-12 row-start-4 content-start">
              <Button
                variant="outlined"
                size="small"
                title="ورود"
                id="enter"
                // onClick={handleSubmit}
                disabled={loading}
                type="submit"
                className="grid col-span-10 col-start-2 h-10 "
              >
                ورود
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

            <div className=" grid grid-cols-subgrid col-span-12 row-start-5 content-start ">
              <Link
                className="grid col-span-6  h-10 "
                component="button"
                onClick={modalProps.handleRegisterMenuOpen}
                type="button"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                ثبت نام كاربر
              </Link>

              <Link
                className="grid col-span-6  h-10 "
                component="button"
                type="button"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                فراموشي رمز عبور
              </Link>

            </div>
          </Box>

        </div>

      </div>
    </Modal>
  );
}
