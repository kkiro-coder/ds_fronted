# dailysearch 企业级前端应用

基于 React 18 + TypeScript + Vite 构建，使用 Arco Design 作为 UI 组件库。

## 技术栈

| 技术 | 版本（根据上下文修正） |
|------|------------------------|
| React | 18.3.1 |
| TypeScript | 5.7.3 |
| Vite | 6.0.7 |
| UI 组件库 | Arco Design 2.56.13 |
| 状态管理 | Zustand 5.0.0 |
| 路由 | React Router 6.28.0 |
| HTTP 请求 | Axios 1.7.9 |
| 图表 | ECharts 5.5.0 |
| 样式 | Less 4.2.1 |

## 项目目录结构
ds-fronted/
├── index.html                          # 入口 HTML (lang=zh-CN)
├── package.json                        # 项目配置 (name: daily-search-login)
├── tsconfig.json                       # TS 严格模式配置
├── vite.config.ts                      # Vite + React 插件
└── src/
    ├── main.tsx                        # 应用挂载入口
    ├── App.tsx                         # 根组件 (路由/页面切换逻辑)
    ├── types.ts                        # 全局类型定义
    ├── index.css                       # 全局样式 (962行，含登录页+仪表盘)
    ├── vite-env.d.ts                   # Vite 类型声明
    ├── hooks/
    │   └── useToast.ts                 # Toast 通知 Hook
    ├── components/
    │   ├── Toast.tsx                   # Toast 通知组件
    │   ├── BrandPanel.tsx              # 登录页 - 品牌左侧面板
    │   ├── LoginForm.tsx               # 登录表单（含验证逻辑）
    │   └── dashboard/
    │       ├── Sidebar.tsx             # 仪表盘侧边栏导航
    │       ├── StatsRow.tsx            # 统计卡片行（4个指标）
    │       ├── ChartPanel.tsx           # 图表面板（Canvas 折线图）
    │       ├── BottomSection.tsx       # 底部区域（搜索记录表+热词榜）
    │       └── DataOverviewBar.tsx     # "求索"数据概览（空状态占位）
    └── pages/
        └── Dashboard.tsx               # 仪表盘页面（布局容器）


## 新增路由与功能模块

根据 `routes.ts`，应用包含以下功能模块：

| 模块        | 路径                                                          | 功能描述                                 |
|-------------|---------------------------------------------------------------|------------------------------------------|
| Dashboard   | `/dashboard/workplace`                                        | 工作台仪表盘                             |
| Cert        | `/cert/order`, `/cert/scan`                                   | 证书扫描、证书列表、证书扫描             |
| Node        | `/node/list`, `/node/monitor`                                 | 节点列表、节点监控                       |
| System      | `/system/auth`, `/system/organization`, `/system/dns-config`, `/system/scheduler`, `/system/log-config`, `/system/connection-config` | 认证管理、组织管理、通知管理、DNS 配置、定时任务、日志配置、连接配置 |
| Log         | `/log/login-log`, `/log/operation-log`, `/log/notification-log`, `/log/system` | 登录日志、操作日志、通知日志、系统日志     |
| User        | `/user/setting`                                               | 用户设置                                 |
| Exception   | `/exception/403`, `/exception/404`                            | 403 / 404 异常页面                        |

## 核心配置

Vite 配置要点：

- 开发服务器端口：`3000`
- API 代理：`/api`, `/auth`, `/uploads` → `http://localhost:8080`
- 路径别名：`@` → `src/`
- Gzip 压缩启用
- 构建产物分包优化（vendor、arco、echarts）
- 权限控制：
  - 路由配置中包含 `requiredPermissions` 字段
  - 使用自定义 `auth` 工具函数进行权限校验
  - 动态过滤可访问路由

## 脚本命令

| 命令               | 功能                   |
|--------------------|------------------------|
| `npm run dev`      | 启动开发服务器         |
| `npm run build`    | 构建生产版本           |
| `npm run preview`  | 预览构建结果           |
| `npm run lint`     | 代码检查               |
| `npm run lint:fix` | 代码自动修复           |

## 部署支持

项目包含 Docker 部署配置：

- `Dockerfile` - Docker 镜像构建文件
- `docker-entrypoint.sh` - 容器启动脚本
- `nginx.conf` - Nginx 配置

## 注意事项
- 暂无
