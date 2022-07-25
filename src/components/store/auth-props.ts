export interface UserAuthContextProps {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, duration: number) => void;
    logout: () => void;
    // newAccount: boolean;
    // setNewAccount: () => void;
}