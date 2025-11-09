#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    API Frontend 一键启动脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未检测到 Node.js，请先安装 Node.js${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js 版本: $(node -v)${NC}"

# 检查 pnpm 是否安装，如果没有则检查 npm
if command -v pnpm &> /dev/null; then
    PACKAGE_MANAGER="pnpm"
    echo -e "${GREEN}✓ 使用 pnpm 作为包管理器${NC}"
elif command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
    echo -e "${YELLOW}⚠ 未检测到 pnpm，将使用 npm${NC}"
else
    echo -e "${RED}错误: 未检测到包管理器（pnpm 或 npm）${NC}"
    exit 1
fi

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}检测到未安装依赖，正在安装...${NC}"
    echo ""
    
    if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
        pnpm install
    else
        npm install
    fi
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}错误: 依赖安装失败${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
    echo ""
else
    echo -e "${GREEN}✓ 依赖已安装${NC}"
    echo ""
fi

# 启动项目
echo -e "${GREEN}正在启动开发服务器...${NC}"
echo ""

if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    pnpm start
else
    npm start
fi

