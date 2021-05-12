import { useCallback } from 'react';
import axios from 'axios';

export default function usePut() {
  return useCallback(async (url, body = {}, config = {}) => {
    try {
      const axiosResponse = await axios.put(url, body, config);
      return { response: axiosResponse, error: null };
    } catch (error) {
      return { response: null, error };
    }
  });
}
