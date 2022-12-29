import axios from 'axios';
import { useState, useCallback } from 'react';
import { Type } from 'typescript';

type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface requestConfigProps {
    url: string;
    // method?: method;
    headers?: {};
    body: FormData;
}

const useFileHttpRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = useCallback(
        async (
            requestConfig: requestConfigProps,
            applyData: (data: {}) => void
        ) => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post(
                    requestConfig.url,
                    requestConfig.body
                );

                applyData(response);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }

            setLoading(false);
        },
        []
    );

    return {
        loading,
        error,
        sendRequest
    };
};

export default useFileHttpRequest;
