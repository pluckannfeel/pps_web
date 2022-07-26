import { useState, useCallback } from 'react';
import { Type } from 'typescript';

type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface requestConfigProps {
    url: string;
    method: method;
    headers: {};
    body: {};
}


const useHttpRequest = () => {
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
                const response = await fetch(requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body
                        ? JSON.stringify(requestConfig.body)
                        : null
                });
                // console.log(response)
                // if (!response.ok) {
                //     throw new Error(response.statusText);
                // }

                const data = await response.json();
                applyData(data);
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

export default useHttpRequest;
