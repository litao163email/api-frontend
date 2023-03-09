import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * 请求拦截器
 */
export const requestConfig: RequestConfig = {
  //基础的调用地址
  baseURL: 'http://localhost:8101',
  withCredentials: true,
  // 请求拦截器

  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url?.concat('?token = 123');
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;

      if (data?.success === false) {
        message.error('请求失败！');
      }
      return response;
    },
  ],
};
