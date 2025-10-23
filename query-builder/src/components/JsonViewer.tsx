import React from 'react'

type Props = { json: unknown }

const JsonViewer: React.FC<Props> = ({ json }) => {
  return (
    <pre className="card code" aria-label="JSON Output">
      {JSON.stringify(json, null, 2)}
    </pre>
  )
}

export default JsonViewer