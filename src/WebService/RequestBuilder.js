import axios from 'axios';

export const baseURL = 'http://localhost:5000/api/'; // Update with your API base URL

let current_token = '';

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

let activeRequests = 0;
let isLoading = false;

const showLoadingIndicator = () => {
    if (activeRequests === 0) {
        isLoading = true;
        // Show a spinner if needed
    }
    activeRequests++;
};

const hideLoadingIndicator = () => {
    activeRequests--;
    if (activeRequests === 0) {
        isLoading = false;
        // Hide the spinner if needed
    }
};

apiClient.interceptors.request.use(
    config => {
        showLoadingIndicator();
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = "multipart/form-data";
        return config;
    },
    error => {
        hideLoadingIndicator();
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    response => {
        hideLoadingIndicator();
        return response;
    },
    error => {
        hideLoadingIndicator();
        console.error('API Error:', error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
);

const request = async (method, url, data = null, params = {}) => {
    try {
        const response = await apiClient.request({ method, url, data, params });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

const createApiFunction = method =>
    async (url, data = null, params = {}) => {
        const response = await request(method, url, data, params);
        return response;
    };

export const get = createApiFunction('get');
export const post = createApiFunction('post');
export const put = createApiFunction('put');
export const del = createApiFunction('delete');

// For <input type="file" /> based uploads
export const uploadFile = async (url, file) => {
    try {
        const formData = new FormData();
        formData.append('image', file); // file = event.target.files[0]
        const response = await request('post', url, formData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const uploadFiles = async (url, files, body = {}, formData = null) => {
    try {
        formData = formData || new FormData();

        files.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await request('post', url, formData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const getPage = async (url, current_page = 1, per_page = 10, param = {}, data = null) => {
    const params = { ...param, current_page, per_page };
    const response = await get(url, data, params);
    return response;
};

export const setHeaders = headers => {
    Object.assign(apiClient.defaults.headers.common, headers);
};

export const setAuthToken = (token) => {
    current_token = `Bearer ${token}`;
    apiClient.defaults.headers.common['Authorization'] = current_token;
    apiClient.defaults.headers.common['X-API-Key'] = token;
};

export const clearAuthToken = () => {
    delete apiClient.defaults.headers.common['Authorization'];
    delete apiClient.defaults.headers.common['X-API-Key'];
};

export const isLoadingIndicatorVisible = () => {
    return isLoading;
};
