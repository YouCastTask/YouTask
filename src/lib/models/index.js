import axios from "axios";
import { baseUrl, timeout } from './../../../app.json';
import AsyncStorage from '@react-native-community/async-storage';

const getTokens = async () => {
    const {  refresh_token,token } = JSON.parse(await AsyncStorage.getItem('tokens'));
    post(`token/refresh`, {
        refresh_token: refresh_token
    }, {
        success: async (response) => {
            const {  refresh_token,token } = response;
            await AsyncStorage.setItem('tokens', JSON.stringify({ token: token, refresh_token: refresh_token }));
        },
        error: (error) => {
            alert("refresh => " + error.response.data.message);
            throw (error);
        }
    }, token);
}

export const get = (url: String, options: Object, token: String) => {
    let requestURL = `${baseUrl}${url}`;
    axios.get(requestURL, { headers: token ? { Authorization: `Bearer ${token}` } : {}, timeout: timeout })
        .then(response => {
            if (options.success) {
                options.success(response.data);
            }
        })
        .catch(error => {
            if (
                error.response.data.message === "Expired JWT Token"
                ||
                error.response.data.message === "JWT Token not found"
            ) {
                getTokens()
            } else if (options.error) {
                options.error(error);
            }
        });
}

export const remove = (url: String, options: Object, token: String) => {
    let requestURL = `${baseUrl}${url}`;
    let CancelToken = axios.CancelToken;

    axios.delete(requestURL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        onDownloadProgress: (progress) => {
            if (options.onDownloadProgress) {
                options.onDownloadProgress(progress);
            }
        },
        onUploadProgress: (progress) => {
            if (options.onUploadProgress) {
                options.onUploadProgress(progress);
            }
        },
        cancelToken: new CancelToken((cancel) => {
            if (options.cancel) {
                options.cancel(cancel);
            }
        }),
        timeout: timeout
    })
        .then(response => {
            if (options.success) {
                options.success(response.data);
            }
        })
        .catch(error => {
            if (error.response.data.message === "Expired JWT Token") {
                getTokens()
            } else if (options.error) {
                options.error(error);
            }
        });
}


export const put = (url: String, params: Object, options: Object, token: String) => {
    let requestURL = `${baseUrl}${url}`;
    let CancelToken = axios.CancelToken;

    axios.put(requestURL, params, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        onDownloadProgress: (progress) => {
            if (options.onDownloadProgress) {
                options.onDownloadProgress(progress);
            }
        },
        onUploadProgress: (progress) => {
            if (options.onUploadProgress) {
                options.onUploadProgress(progress);
            }
        },
        cancelToken: new CancelToken((cancel) => {
            if (options.cancel) {
                options.cancel(cancel);
            }
        }),
        timeout: timeout
    })
        .then(response => {
            if (options.success) {
                options.success(response.data);
            }
        })
        .catch(error => {
            if (error.response.data.message === "Expired JWT Token") {
                getTokens()
            } else if (options.error) {
                options.error(error);
            }
        });
}

export const post = (url: String, params: Object, options: Object, token: String) => {
    let requestURL = `${baseUrl}${url}`;
    let CancelToken = axios.CancelToken;

    axios.post(requestURL, params, {
        headers: token &&  url !== 'token/refresh'  ? { Authorization: `Bearer ${token}` } : {},
        onDownloadProgress: (progress) => {
            if (options.onDownloadProgress) {
                options.onDownloadProgress(progress);
            }
        },
        onUploadProgress: (progress) => {
            if (options.onUploadProgress) {
                options.onUploadProgress(progress);
            }
        },
        cancelToken: new CancelToken((cancel) => {
            if (options.cancel) {
                options.cancel(cancel);
            }
        }),
        timeout: timeout
    })
        .then(response => {
            if (options.success) {
                options.success(response.data);
            }
        })
        .catch(error => {
            if (error.response.data.message === "Expired JWT Token") {
                getTokens()
            }else if (options.error) {
                options.error(error);
            }
        });
}