# Query Builder (React + TypeScript + Vite)

A minimal, reusable Query Builder UI that lets users construct queries with one or more conditions using **AND / OR** logic. Supports **nested groups**, dynamic dropdowns, and exports a clean JSON shape.

## ✨ Features

- Add/remove **conditions** with Field, Operator, Value
- **AND / OR** toggle per group
- **Nested groups** (unlimited depth)
- Dynamic dropdowns for values by field
- Live JSON output (ready to consume)
- Unit tests for core transformation logic (Vitest)

## 🛠 Tech

- React 18 + TypeScript
- Vite
- Vitest + Testing Library (jsdom)

## 🚀 Get Started

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build

# 4) Run tests
npm test
```

Open the app at the URL shown in the terminal.

## 📁 Project Structure

```
query-builder/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   ├── options.ts
│   ├── utils.ts
│   ├── types.ts
│   ├── components/
│   │   ├── QueryBuilder.tsx
│   │   ├── Group.tsx
│   │   └── ConditionRow.tsx
│   └── __tests__/
│       └── queryBuilder.test.tsx
└── README.md
```

## 📄 JSON Output Shape

The UI emits a nested structure like:

```json
{
  "logic": "AND",
  "conditions": [
    { "field": "Status", "operator": "equals", "value": "Open" }
  ],
  "groups": [
    {
      "logic": "OR",
      "conditions": [
        { "field": "Priority", "operator": "equals", "value": "High" },
        { "field": "Category", "operator": "equals", "value": "Bug" }
      ]
    }
  ]
}
```

## 🔧 Customize

- Edit `src/options.ts` to change fields, operators or allowed values.
- Style tweaks in `src/styles.css` (no CSS framework required).

## ✅ Meets Assignment Requirements

- Single & multiple conditions, AND/OR groups, nested groups, dropdowns, and JSON output as requested.
- Clean, functional components + hooks, no backend/persistence.
- Optional unit tests included (`toOutput` logic).

---

MIT License © 2025