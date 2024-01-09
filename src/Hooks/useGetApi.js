import {useState, useEffect} from 'react';
import axios from 'axios';

const useApi = () => {
  const [endPoint, setEndPoint] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiParams, setApiParams] = useState({});
  const [pathParams, setPathParams] = useState('');

  const API_URL = 'https://www.rijksmuseum.nl/api/';

  const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getApiData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`${endPoint}/${pathParams}`, {
        params: {
          key: 'GMZbiDud',
          ...apiParams,
        },
      });
      setData(response?.data);
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, [endPoint, apiParams, pathParams]);

  const callApi = (newUrl, params = {}, newPathParams = '') => {
    setApiParams(params);
    setEndPoint(newUrl);
    setPathParams(newPathParams);
  };

  return {data, loading, error, callApi};
};

export default useApi;
