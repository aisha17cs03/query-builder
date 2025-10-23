import React, { useMemo, useState } from 'react'
import Group from './Group'
import JsonViewer from './JsonViewer'
import { toOutput, uid } from '../utils'
import type { GroupNode, OutputGroup } from '../types'

const createRoot = (): GroupNode => ({
  id: uid(),
  type: 'group',
  logic: 'AND',
  children: [],
})

const QueryBuilder: React.FC = () => {
  const [root, setRoot] = useState<GroupNode>(createRoot())
  const output: OutputGroup = useMemo(() => toOutput(root), [root])

  const reset = () => setRoot(createRoot())

  return (
    <div className="container">
      <div className="card vstack">
        <h1>Query Builder</h1>
        <p><small>Build queries with groups and conditions. Combine with AND/OR logic and nest as needed.</small></p>
        <Group node={root} onChange={setRoot} />
        <div className="hstack" style={{justifyContent:'space-between'}}>
          <div className="hstack">
            <button className="btn primary" onClick={() => alert('Query JSON updated below.')}>Submit</button>
            <button className="btn ghost" onClick={reset}>Reset</button>
          </div>
          <span className="badge">Output updates live</span>
        </div>
      </div>
      <JsonViewer json={output} />
      <div className="card">
        <h3>How it works</h3>
        <ul>
          <li>Add <b>conditions</b> (Field, Operator, Value).</li>
          <li>Switch <b>group logic</b> between AND / OR.</li>
          <li>Add <b>nested groups</b> for advanced logic.</li>
          <li>JSON output mirrors your structure.</li>
        </ul>
      </div>
    </div>
  )
}

export default QueryBuilder