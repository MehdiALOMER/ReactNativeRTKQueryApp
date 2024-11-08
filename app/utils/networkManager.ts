// app/utils/networkManager.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Axios örneğini oluşturuyoruz
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Temel URL
    timeout: 10000, // Zaman aşımı (10 saniye)
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// İstek interceptor'u: Her isteğe yetkilendirme (authorization) token'ı ekleyebiliriz
/* axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('authToken'); // Token varsa, ekler
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
); */

// Yanıt interceptor'u: Yanıtlarda hata yönetimi yapabiliriz
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // 401 Hatası durumunda oturum sonlandırma veya yönlendirme işlemi yapılabilir
            console.warn("Oturum süresi doldu. Tekrar giriş yapınız.");
            // logoutUser(); // Kullanıcının oturumunu kapatma veya giriş sayfasına yönlendirme işlemi
        }
        return Promise.reject(error);
    }
);

// GET isteği
export const getRequest = async <T>(url: string, params?: any): Promise<T> => {
    const response = await axiosInstance.get<T>(url, { params });
    console.log('response ::::::::: ', response)
    return response.data;
};

// POST isteği
export const postRequest = async <T>(url: string, data: any): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
};

// PUT isteği
export const putRequest = async <T>(url: string, data: any): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
};

// DELETE isteği
export const deleteRequest = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
};

export default axiosInstance;
