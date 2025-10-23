import React from 'react'
import { FIELD_VALUES, FIELDS, OPERATORS } from '../options'
import type { ConditionNode, Field, Operator } from '../types'

type Props = {
  node: ConditionNode
  onChange: (patch: Partial<ConditionNode>) => void
  onRemove: () => void
}

const ConditionRow: React.FC<Props> = ({ node, onChange, onRemove }) => {
  const values = node.field ? FIELD_VALUES[node.field] : []

  return (
    <div className="hstack">
      <span className="badge">Condition</span>
      <select
        aria-label="Field"
        value={node.field}
        onChange={e => onChange({ field: e.target.value as Field, value: '' })}
      >
        <option value="">Field</option>
        {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
      </select>

      <select
        aria-label="Operator"
        value={node.operator}
        onChange={e => onChange({ operator: e.target.value as Operator })}
      >
        <option value="">Operator</option>
        {OPERATORS.map(op => <option key={op} value={op}>{op}</option>)}
      </select>

      {node.field ? (
        <select
          aria-label="Value"
          value={node.value}
          onChange={e => onChange({ value: e.target.value })}
        >
          <option value="">Value</option>
          {values.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      ) : (
        <input
          aria-label="Value"
          type="text"
          placeholder="Value"
          value={node.value}
          onChange={e => onChange({ value: e.target.value })}
        />
      )}

      <button className="btn danger" onClick={onRemove} aria-label="Remove Condition">Remove</button>
    </div>
  )
}

export default ConditionRow