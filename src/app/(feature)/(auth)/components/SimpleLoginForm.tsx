"use client";
import { useLogin } from "../queries/useLogin";
import { Controller, ErrorOption, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Paper,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { defaultLoginForm, LoginRequest } from "../types";
import Phone from "@mui/icons-material/Phone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LucideUserCircle2 } from 'lucide-react';
import { useState } from "react";

export function SimpleLoginForm() {
  const { mutate, error, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    getFieldState,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    defaultValues: defaultLoginForm,
    mode: "all",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: LoginRequest) => {
    mutate({ username: data.username, password: data.password, type: "simple" });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ p: 4,pt:1, width: 360}} className="">
         <div className="text-center flex justify-center mt-3">
            <LucideUserCircle2 className="size-20 mr-2 flex" fontSize={10} fontWeight={10} />
          </div><strong className='flex justify-center text-2xl pr-5'>ورود كاربر</strong>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{pt:8,
          '& .muirtl-13meb6w-MuiInputBase-input-MuiOutlinedInput-input':{
                          direction:'ltr '
                        }
        }} >
           <div className="grid col-span-10 col-start-2 h-18 text-align-end">
            <Controller
              name="username"
              control={control}
              defaultValue=""
              
              rules={{
                required: "نام کاربری اجباريست",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "نام کاربری صحيح نمي باشد",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.username}
                  helperText={errors.username?.message as string}
                  type="tel"
                  
                  id="username"
                  size="small"
                  label="نام کاربری"
                  variant="outlined"
                  slotProps={{
                    input: {
                      className:"text-align-end",
                      sx: { borderRadius: 100, padding: "1px 0px"},
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ height: "50px" }}
                        >
                          <IconButton>
                            <Phone width={18} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                    inputLabel: {
                      shrink: false,
                      sx: { fontSize: "20px" },
                    },
                  }}
                  className="text-align-end"
                />
              )}
            />
          </div>

          <div className="grid col-span-10 col-start-2 h-18">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: " رمز عبور اجباريست",
                min: { value: 4, message: "2" },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.password}
                  helperText={errors.password?.message as string}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="رمز عبور"
                  size="small"
                  slotProps={{
                    input: {
                      sx: { borderRadius: 100, p: "1px 0px", pr:0,
                        textAlign:'end'
                      },
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
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
                      sx: { fontSize: "20px" },
                    },
                  }}
                  variant="outlined"
                  sx={{}}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            loading={isPending}
            loadingPosition="center"
            fullWidth
            disabled={isPending}
            sx={{ mt: 2 }}
          >
            ورود
          </Button>

          {/* <Button
            type="submit"
            size="large"
            loading={isPending}
            loadingPosition="center"
            variant="outlined"
            sx={{ borderRadius: 100 }}
            className="border border-gray-300 rounded-full"
          >
            <span className="text-3xl">ورود</span>
          </Button> */}
        </Box>
      </Paper>
    </Box>
  );
}
