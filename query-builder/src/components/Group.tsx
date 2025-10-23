import React from 'react'
import ConditionRow from './ConditionRow'
import { isCondition, isGroup, uid } from '../utils'
import type { GroupNode, ConditionNode, Logic, TreeNode } from '../types'

type Props = {
  node: GroupNode
  onChange: (node: GroupNode) => void
  onRemove?: () => void
}

const Group: React.FC<Props> = ({ node, onChange, onRemove }) => {
  const updateChild = (idx: number, child: TreeNode) => {
    const next = { ...node, children: node.children.slice() }
    next.children[idx] = child
    onChange(next)
  }

  const removeChild = (idx: number) => {
    const next = { ...node, children: node.children.filter((_, i) => i !== idx) }
    onChange(next)
  }

  const addCondition = () => {
    const newCond: ConditionNode = { id: uid(), type: 'condition', field: '', operator: '', value: '' }
    onChange({ ...node, children: [...node.children, newCond] })
  }

  const addGroup = () => {
    const newGroup: GroupNode = { id: uid(), type: 'group', logic: 'AND', children: [] }
    onChange({ ...node, children: [...node.children, newGroup] })
  }

  const setLogic = (logic: Logic) => onChange({ ...node, logic })

  return (
    <div className="card group vstack">
      <div className="toolbar">
        <span className="badge">Group</span>
        <label className="hstack" style={{gap: 4}}>
          <small>Logic</small>
          <select value={node.logic} onChange={e => setLogic(e.target.value as Logic)} aria-label="Group Logic">
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </label>
        <button className="btn" onClick={addCondition}>+ Condition</button>
        <button className="btn" onClick={addGroup}>+ Group</button>
        {onRemove && <button className="btn danger" onClick={onRemove}>Remove Group</button>}
      </div>
      <div className="vstack">
        {node.children.length === 0 && <small>No children yet. Add a condition or a nested group.</small>}
        {node.children.map((child, idx) => (
          <div key={child.id}>
            {isCondition(child) ? (
              <ConditionRow
                node={child}
                onChange={patch => updateChild(idx, { ...child, ...patch })}
                onRemove={() => removeChild(idx)}
              />
            ) : isGroup(child) ? (
              <Group
                node={child}
                onChange={updated => updateChild(idx, updated)}
                onRemove={() => removeChild(idx)}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Group