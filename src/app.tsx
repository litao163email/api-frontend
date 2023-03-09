import Footer from '@/components/Footer';
import { Question, SelectLang } from '@/components/RightContent';
import { getLoginUserUsingGET } from '@/services/fastApi/userController';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { requestConfig } from './requestConfig';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
//首次打开页面上会保存状态(自定义全局变量InitialStatus)
export async function getInitialState(): Promise<InitialState> {
  //定义一个全局状态装用户信息
  const state: InitialState = {
    loginUser: undefined,
  };
  try {
    //这是获取当前用户的
    const res = await getLoginUserUsingGET();
    console.log('333' + res.data);
    if (res.data) {
      state.loginUser = res.data;
    }
  } catch (error) {
    history.push(loginPath);
  }
  return state;
}

/**
 * 支持生成水印
 * @param initialState
 * @param setInitialState
 */
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.loginUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.loginUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      if (!initialState?.loginUser) {
        history.push(loginPath);
      }
    },
    // layoutBgImgList: [
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
    //     left: 85,
    //     bottom: 100,
    //     height: '303px',
    //   },
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
    //     bottom: -68,
    //     right: -45,
    //     height: '303px',
    //   },
    //   {
    //     src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
    //     bottom: 0,
    //     left: 0,
    //     width: '331px',
    //   },
    // ],
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
