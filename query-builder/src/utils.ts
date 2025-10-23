import { ConditionNode, GroupNode, OutputCondition, OutputGroup, TreeNode } from './types'

export const uid = () => Math.random().toString(36).slice(2, 10)

export function isGroup(n: TreeNode): n is GroupNode {
  return n.type === 'group'
}

export function isCondition(n: TreeNode): n is ConditionNode {
  return n.type === 'condition'
}

/** Convert internal tree to compact OutputGroup shape */
export function toOutput(group: GroupNode): OutputGroup {
  const out: OutputGroup = { logic: group.logic }
  const conditions: OutputCondition[] = []
  const groups: OutputGroup[] = []
  for (const child of group.children) {
    if (isCondition(child)) {
      if (child.field && child.operator && child.value !== '') {
        conditions.push({
          field: child.field,
          operator: child.operator,
          value: child.value,
        })
      }
    } else {
      groups.push(toOutput(child))
    }
  }
  if (conditions.length) out.conditions = conditions
  if (groups.length) out.groups = groups
  return out
}