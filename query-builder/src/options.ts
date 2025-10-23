import type { Field, Operator } from './types'

export const FIELDS: Field[] = ['Status', 'Priority', 'Assigned To', 'Category']

export const OPERATORS: Operator[] = ['equals', 'not equals', 'contains', 'does not contain']

export const FIELD_VALUES: Record<Field, string[]> = {
  'Status': ['Open', 'In Progress', 'Closed'],
  'Priority': ['Low', 'Medium', 'High'],
  'Assigned To': ['User A', 'User B', 'User C'],
  'Category': ['Bug', 'Feature', 'Task'],
}