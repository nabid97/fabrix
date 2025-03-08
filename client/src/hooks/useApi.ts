import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import api from '../config/apiConfig';

interface UseApiOptions {
  /**
   * Whether to automatically execute the request upon hook mounting
   */
  executeOnMount?: boolean;
  
  /**
   * Custom error handler function
   */
  onError?: (error: AxiosError) => void;
  
  /**
   * Custom success handler function
   */
  onSuccess?: <T>(data: T) => void;
  
  /**
   * Dependencies to watch for automatic re-execution of request
   */
  deps?: any[];
}

interface UseApiState<T> {
  /**
   * Data returned from the API request
   */
  data: T | null;
  
  /**
   * Whether a request is currently in progress
   */
  loading: boolean;
  
  /**
   * Error object if the request failed
   */
  error: AxiosError | null;
}

type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

/**
 * Custom hook for handling API requests with loading, error, and data state
 */
function useApi<T = any>(
  method: RequestMethod = 'get',
  url: string,
  options: UseApiOptions = {},
  initialData: T | null = null
) {
  const {
    executeOnMount = false,
    onError,
    onSuccess,
    deps = [],
  } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: initialData,
    loading: executeOnMount,
    error: null,
  });
  
  const execute = useCallback(
    async (data?: any, config?: AxiosRequestConfig): Promise<T | null> => {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      
      try {
        let response: AxiosResponse<T>;
        
        switch (method) {
          case 'get':
            response = await api.get<T>(url, config);
            break;
          case 'post':
            response = await api.post<T>(url, data, config);
            break;
          case 'put':
            response = await api.put<T>(url, data, config);
            break;
          case 'patch':
            response = await api.patch<T>(url, data, config);
            break;
          case 'delete':
            response = await api.delete<T>(url, config);
            break;
          default:
            throw new Error(`Unsupported request method: ${method}`);
        }
        
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
        
        if (onSuccess) {
          onSuccess(response.data);
        }
        
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        
        setState({
          data: initialData,
          loading: false,
          error: axiosError,
        });
        
        if (onError) {
          onError(axiosError);
        }
        
        return null;
      }
    },
    [method, url, onSuccess, onError, initialData]
  );
  
  // Execute request on mount if specified
  useEffect(() => {
    if (executeOnMount) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executeOnMount, ...deps]);
  
  return {
    ...state,
    execute,
    setState,
  };
}

export default useApi;