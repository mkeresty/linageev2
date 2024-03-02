'use client'

import {useTheme} from 'next-themes'
import {DarkModeSwitch} from "react-toggle-dark-mode";

export default function ThemeChanger({props}) {

    const {systemTheme, theme, setTheme} = useTheme();
    const isDarkMode = theme === 'dark';

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <>
            <DarkModeSwitch
                style={{}}
                checked={isDarkMode}
                onChange={toggleTheme}
                size={20}
                moonColor={'#a3a3a3'}
                sunColor={'#ca8a04'}
            />
        </>
    )
}