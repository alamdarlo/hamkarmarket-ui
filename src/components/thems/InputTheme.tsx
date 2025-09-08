'use client'
import React from 'react'
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { cacheRtl } from '@/types/commonTypes';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from './muiThems';


export default function InputTheme({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CacheProvider value={cacheRtl}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
            </LocalizationProvider>
        </CacheProvider>
    )
}
