import axios, { AxiosError } from 'axios';

interface ApiBaseErrorModel {
  message: string;
}

export interface BaseErrorModel extends AxiosError<ApiBaseErrorModel> {}

export const api = axios.create({
  baseURL: 'http://192.168.100.4:3333'
});
