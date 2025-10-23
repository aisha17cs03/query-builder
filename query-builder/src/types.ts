export type Logic = 'AND' | 'OR'

export type Field = 'Status' | 'Priority' | 'Assigned To' | 'Category'

export type Operator = 'equals' | 'not equals' | 'contains' | 'does not contain'

export type NodeType = 'group' | 'condition'

export interface BaseNode {
  id: string
  type: NodeType
}

export interface ConditionNode extends BaseNode {
  type: 'condition'
  field: Field | ''
  operator: Operator | ''
  value: string
}

export interface GroupNode extends BaseNode {
  type: 'group'
  logic: Logic
  children: TreeNode[]
}

export type TreeNode = GroupNode | ConditionNode

export interface OutputCondition {
  field: Field
  operator: Operator
  value: string
}

export interface OutputGroup {
  logic: Logic
  conditions?: OutputCondition[]
  groups?: OutputGroup[]
}