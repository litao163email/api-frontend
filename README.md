# API 平台前端

基于 Ant Design Pro 和 React 的 API 接口管理平台前端应用，提供现代化的管理界面。

## 项目简介

这是 API 接口管理平台的前端应用，提供以下功能：

- **接口列表**：浏览和搜索可用的 API 接口
- **接口详情**：查看接口的详细信息和调用示例
- **接口管理**：管理员可以添加、编辑、上线/下线接口
- **用户管理**：用户注册、登录、个人信息管理
- **数据分析**：接口调用数据统计和可视化展示
- **接口调用**：在线测试接口调用功能

## 技术栈

- **框架**：React 18.2.0
- **UI 组件库**：Ant Design 5.2.2
- **构建工具**：Umi Max 4.0.52
- **语言**：TypeScript 4.9.5
- **状态管理**：Umi 数据流
- **图表库**：ECharts 5.4.1
- **其他**：Ant Design Pro Components、React Router

## 环境要求

- Node.js >= 12.0.0（推荐使用 Node.js 16+）
- pnpm >= 7.0.0（推荐）或 npm >= 6.0.0

## 项目结构

```
api-frontend/
├── config/              # 配置文件
│   ├── config.ts        # Umi 主配置
│   ├── proxy.ts         # 代理配置
│   ├── routes.ts        # 路由配置
│   └── defaultSettings.ts  # 默认设置
├── src/
│   ├── pages/           # 页面组件
│   │   ├── Index/       # 接口列表页
│   │   ├── InterfaceDetails/  # 接口详情页
│   │   ├── Admin/       # 管理页面
│   │   │   ├── InterfaceInfo/     # 接口管理
│   │   │   └── InterfaceAnalysis/ # 数据分析
│   │   └── User/        # 用户相关页面
│   ├── services/        # API 服务（自动生成）
│   │   └── fastApi/     # 后端 API 服务
│   ├── components/      # 公共组件
│   ├── app.tsx          # 应用入口
│   └── access.ts        # 权限控制
├── public/              # 静态资源
└── mock/                # Mock 数据
```

## 配置说明

### 1. 后端 API 地址配置

编辑 `config/proxy.ts`，配置开发环境的 API 代理：

```typescript
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8101',  // 后端服务地址
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
```

### 2. OpenAPI 配置

编辑 `config/config.ts`，配置 OpenAPI 文档地址（用于自动生成 API 服务代码）：

```typescript
openAPI: [
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: 'http://localhost:8101/api/v3/api-docs',  // 后端 OpenAPI 文档地址
    projectName: 'fastApi',
    // ...
  },
],
```

### 3. 应用标题和 Logo

编辑 `config/defaultSettings.ts`：

```typescript
export default {
  title: 'Better-API',  // 应用标题
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',  // Logo 地址
  // ...
};
```

## 快速开始

### 1. 安装依赖

```bash
cd api-frontend

# 使用 pnpm（推荐，速度更快）
pnpm install

# 或使用 npm
npm install
```

> **注意**：如果使用 npm，建议先安装 pnpm：`npm install -g pnpm`

### 2. 配置后端地址

确保后端服务已启动（默认地址：http://localhost:8101）

如果后端地址不同，需要修改：
- `config/proxy.ts` 中的代理配置（开发环境）
- `config/config.ts` 中的 OpenAPI 地址

### 3. 启动开发服务器

#### 方式一：使用启动脚本（推荐）

```bash
./start.sh
```

启动脚本会自动：
- 检查 Node.js 环境
- 检查并安装依赖（如果未安装）
- 启动开发服务器

#### 方式二：直接运行

```bash
# 使用 pnpm
pnpm start

# 或使用 npm
npm start
```

### 4. 访问应用

启动成功后，访问：http://localhost:8000

默认路由：
- `/` - 首页（接口列表）
- `/list` - 接口列表
- `/details/:id` - 接口详情
- `/manger` - 接口管理（需要管理员权限）
- `/analysis` - 数据分析（需要管理员权限）

## 常用命令

```bash
# 启动开发服务器
pnpm start
# 或
npm start

# 构建生产版本
pnpm build
# 或
npm run build

# 代码检查
pnpm lint
# 或
npm run lint

# 自动修复代码格式问题
pnpm lint:fix
# 或
npm run lint:fix

# 运行测试
pnpm test
# 或
npm test

# 预览生产构建
pnpm preview
# 或
npm run preview
```

## 开发说明

### API 服务自动生成

项目使用 OpenAPI 自动生成 API 服务代码。当后端 API 文档更新后：

1. 确保后端服务运行在配置的地址
2. 运行以下命令重新生成：

```bash
pnpm openapi
# 或
npm run openapi
```

生成的代码位于 `src/services/fastApi/` 目录。

### 添加新页面

1. 在 `src/pages/` 目录下创建页面组件
2. 在 `config/routes.ts` 中添加路由配置

示例：

```typescript
// config/routes.ts
{
  path: '/new-page',
  name: '新页面',
  component: './NewPage',
}
```

### 权限控制

在 `src/access.ts` 中配置权限，在路由或组件中使用：

```typescript
// 在组件中
import { useAccess } from '@umijs/max';

const access = useAccess();
if (access.canAdmin) {
  // 管理员功能
}
```

### 代理配置说明

- **开发环境**：使用 `config/proxy.ts` 中的代理配置
- **生产环境**：需要在 Web 服务器（如 Nginx）中配置反向代理

生产环境代理配置示例（Nginx）：

```nginx
location /api/ {
    proxy_pass http://localhost:8101/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## 常见问题

### 1. 启动失败：端口被占用

- 检查 8000 端口是否被占用：`lsof -i:8000`
- 修改端口：设置环境变量 `PORT=8001` 或修改 Umi 配置

### 2. API 请求失败

- 检查后端服务是否启动
- 检查 `config/proxy.ts` 中的代理配置是否正确
- 检查浏览器控制台的错误信息

### 3. 依赖安装失败

- 清除缓存：`pnpm store prune` 或 `npm cache clean --force`
- 删除 `node_modules` 和锁文件，重新安装
- 检查网络连接和镜像源配置

### 4. 页面空白或路由错误

- 检查 `config/routes.ts` 中的路由配置
- 检查组件路径是否正确
- 查看浏览器控制台的错误信息

### 5. 样式不生效

- 确保正确导入样式文件
- 检查 Less 配置是否正确
- 清除浏览器缓存

## 构建部署

### 构建生产版本

```bash
pnpm build
```

构建产物位于 `dist/` 目录。

### 部署到服务器

1. 将 `dist/` 目录上传到服务器
2. 配置 Web 服务器（Nginx、Apache 等）
3. 配置反向代理指向后端 API

### 环境变量

可以通过环境变量配置不同环境：

```bash
# 开发环境
REACT_APP_ENV=dev pnpm start

# 测试环境
REACT_APP_ENV=test pnpm start

# 预发布环境
REACT_APP_ENV=pre pnpm start
```

## 许可证

查看 LICENSE 文件了解详情。
