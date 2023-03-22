import {IAppConfig} from '../../interfaces';

// const APP_MODE = 'dev';
const APP_MODE = 'production';
const CONFIG = {
  dev: {
    SOCKET_URL: 'http://192.168.43.3:8080',
    BACKEND_URL: 'http://192.168.43.3:8080/api',
    FILE_URL: 'http://192.168.43.3:8080/uploads/',

    // BACKEND_URL: 'http://172.31.34.64:8080/api',
    // FILE_URL: 'http://172.31.34.64:8080/uploads/',
  },
  production: {
    SOCKET_URL: 'https://apis.ntuma.rw',
    BACKEND_URL: 'https://apis.ntuma.rw/api',
    FILE_URL: 'https://apis.ntuma.rw/uploads/',
  },
};

export const app: IAppConfig = {
  SOCKET_URL: CONFIG[APP_MODE].SOCKET_URL,
  BACKEND_URL: CONFIG[APP_MODE].BACKEND_URL,
  FILE_URL: CONFIG[APP_MODE].FILE_URL,
};
