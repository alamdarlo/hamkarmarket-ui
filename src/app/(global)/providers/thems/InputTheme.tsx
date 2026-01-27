'use client'
import React from 'react'
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from './muiThems';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';


export const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

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
