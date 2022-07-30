export interface UserAuthContextProps {
    token: string | null;
    isAuthenticated: boolean;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    login: (token: string, duration: number) => void;
    logout: () => void;
    // newAccount: boolean;
    // setNewAccount: () => void;
}

export interface StoredTokenProps {
    token: string;
    duration: Date;
}
