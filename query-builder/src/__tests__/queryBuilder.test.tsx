import { describe, it, expect } from 'vitest'
import { toOutput } from '../utils'
import type { GroupNode } from '../types'

describe('toOutput', () => {
  it('flattens a simple group with valid conditions', () => {
    const tree: GroupNode = {
      id: 'root', type: 'group', logic: 'AND', children: [
        { id: 'c1', type: 'condition', field: 'Status', operator: 'equals', value: 'Open' },
        { id: 'c2', type: 'condition', field: 'Priority', operator: 'equals', value: 'High' },
      ]
    }
    const out = toOutput(tree)
    expect(out.logic).toBe('AND')
    expect(out.conditions?.length).toBe(2)
  })

  it('supports nested groups', () => {
    const tree: GroupNode = {
      id: 'root', type: 'group', logic: 'AND', children: [
        { id: 'c1', type: 'condition', field: 'Status', operator: 'equals', value: 'Open' },
        { id: 'g1', type: 'group', logic: 'OR', children: [
          { id: 'c2', type: 'condition', field: 'Priority', operator: 'equals', value: 'High' },
          { id: 'c3', type: 'condition', field: 'Category', operator: 'equals', value: 'Bug' },
        ]},
      ]
    }
    const out = toOutput(tree)
    expect(out.groups?.length).toBe(1)
    expect(out.groups?.[0].logic).toBe('OR')
  })

  it('skips incomplete conditions', () => {
    const tree: GroupNode = {
      id: 'root', type: 'group', logic: 'AND', children: [
        { id: 'c1', type: 'condition', field: '', operator: '', value: '' },
      ]
    }
    const out = toOutput(tree)
    expect(out.conditions).toBeUndefined()
  })
})