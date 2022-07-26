export function errorMessage(error: string) {
    switch (error) {
        case 'Unprocessable Entity':
            return 'The request was well-formed but was unable to be followed due to semantic errors.';
        case 'Unauthorized':
            break;
    }
}
