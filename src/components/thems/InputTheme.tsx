'use client'
import React from 'react'
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { cacheRtl } from '@/types/commonTypes';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV2";
import theme from './muiThems';


export default function InputTheme({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CacheProvider value={cacheRtl}>
            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
            </LocalizationProvider>
        </CacheProvider>
    )
}
