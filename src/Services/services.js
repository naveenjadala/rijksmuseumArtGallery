import axios from 'axios';
import {createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit';
import endpoints from './endpoints';

const API_URL = 'https://www.rijksmuseum.nl/api/';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAllCollections = async params => {
  try {
    const response = await apiClient.get(`${endpoints.GET_ALL_ART_API}`, {
      params: {
        key: 'GMZbiDud',
        ...params,
      },
    });
    return response?.data?.artObjects;
  } catch (error) {
    throw new Error(`API request failed with ${error.message}`);
  }
};

const getCollection = async id => {
  try {
    const response = await apiClient.get(`${endpoints.GET_ART_API}/${id}`, {
      params: {
        key: 'GMZbiDud',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`API request failed with ${error.message}`);
  }
};

export {getAllCollections, getCollection};
