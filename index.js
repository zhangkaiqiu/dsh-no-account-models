/**
 * dsh-no-account-models
 *
 * 这个插件没有运行时逻辑：效果完全来自 cordis.patch.yml 里对内置 row
 * `llm-deepseek-account`（DeepSeek 账号的模型路由）的 `disabled: true` 覆盖。
 *
 * 插件的启用/禁用决定这一层 patch 是否参与组合：
 *   开启 -> 该 row 不注册，模型选择器里「DeepSeek 账号」组消失；
 *   关闭 -> patch 层撤销，该组恢复。
 *
 * 所以 apply 留空即可，不需要注册任何服务、工具或 UI。
 */
export const name = 'no-account-models'

export function apply() {}
