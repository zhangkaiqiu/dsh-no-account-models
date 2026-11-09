# dsh-no-account-models

把「DeepSeek 账号」这一组模型从 DeepSeek Harness 的模型选择器里拿掉。

## 为什么

登录 DeepSeek 账号之后，模型选择器里会多出一组「DeepSeek 账号」（`deepseek-flash`、`deepseek-v4-pro` 等）。如果你日常只用自己配的 provider（Qoder、Kiro、API Key 等），这组模型既是噪音，也容易被误选 —— 它走的是账号额度。

这个插件用 DSH 自带的 patch 机制，把这条模型路由整个禁用掉，不需要改 DSH 源码。

## 效果

- 模型选择器里不再出现「DeepSeek 账号」整组
- **账号登录、余额、订阅照旧** —— 它们由另一个 row（`deepseek-account`）提供，本插件不动
- DeepSeek API Key 路由（`deepseek-official`）和第三方 provider 都不受影响

## 安装

从 GitHub 直接装：

```bash
dsh plugin --profile desktop add github:zhangkaiqiu/dsh-no-account-models
```

`desktop` 是桌面版的 profile 名（命令行版用 `web`，改成你自己的 profile）。也可以锁 tag：

```bash
dsh plugin --profile desktop add github:zhangkaiqiu/dsh-no-account-models#v0.1.0
```

更新用 `dsh plugin --profile desktop update dsh-no-account-models`（跟 main 时有效；装了 tag 的
升级要重新 `add` 新 tag）。本插件没有 client 半，装完重启 DSH 即生效；如果页面已经打开，刷新
一次也能看到选择器变化。

本地开发时也可以直接在 DSH 插件页安装本目录。

## 开关

插件页里的「隐藏 DeepSeek 账号模型」就是开关：

- 开启：`llm-deepseek-account` 不注册，「DeepSeek 账号」组消失
- 关闭：这一层 patch 撤销，该组恢复

## 实现

没有运行时逻辑，效果完全来自 [`cordis.patch.yml`](./cordis.patch.yml) 对内置 row 的按 id 覆盖：

```yaml
- id: llm-deepseek-account
  disabled: true
```

`index.js` 只有一个空的 `apply()`，作用是让插件在列表里有一个可开关的条目。

为什么是「禁用」而不是「隐藏」：`llm` 服务没有任何目录过滤事件，账号路由也没有 `models` 白名单（写了会直接加载失败），所以官方路径只有禁用整条路由。

## 注意

- 已经保存了「DeepSeek 账号 / deepseek-flash」的会话，需要手动切一次模型，否则发送时会报模型不可用
- 该路由是彻底不可用，不只是从列表里隐藏

## License

[MIT](./LICENSE)
