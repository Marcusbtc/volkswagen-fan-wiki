import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Car {
    id: number;
    name: string;
    production_start: string | null;
    production_end: string | null;
    models: any[];
    image_url: string | null;
}

export const getCars = () => api.get(`/api/cars`).then((response) => response.data);
export const getCar = (id: number) => api.get(`/api/cars/${id}`).then((response) => response.data);
export const createCar = (car: Omit<Car, 'id'>) => api.post(`/api/cars`, car).then((response) => response.data);
export const updateCar = (id: number, car: Car) => api.put(`/api/cars/${id}`, car).then((response) => response.data);
export const deleteCar = (id: number) => api.delete(`/api/cars/${id}`).then((response) => response.data);
