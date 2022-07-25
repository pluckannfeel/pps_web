export interface registerFormProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    day: string;
    month: string;
    year: string;
    confirm: string;
    termsOfService: boolean;
}

export interface logInFormValues {
    email: string;
    password: string;
}