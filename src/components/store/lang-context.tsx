import React, { useState, useEffect } from 'react';
import { LangContextProps } from '../store/lang-props';

const LangContext = React.createContext<LangContextProps>({
    language: 'en',
    setLanguage: (language: string) => {}
});

interface FCProps {
    children: React.ReactNode;
}

export const LangContextProvider: React.FunctionComponent<FCProps> = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <LangContext.Provider value={{ language, setLanguage }}>
            {children}
        </LangContext.Provider>
    );
};

export default LangContext;

