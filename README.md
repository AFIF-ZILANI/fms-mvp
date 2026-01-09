# 🌾 Farm Management System (FMS)

A **production-focused Farm Management System** built to help poultry & livestock farms run **profitably**, **data‑driven**, and **scalably**.

> ⚠️ **Important clarity (no marketing fluff):**
> This is **not** a generic SaaS FMS built for everyone. The primary goal is to **optimize my own farm operations**. External users may use it, but data transparency and trade‑offs will be clearly stated.

---

## 🎯 Core Philosophy

* Profit > vanity metrics
* Decisions backed by **real farm data**, not assumptions
* Transparency over dark UX patterns
* Designed for **real farms**, not demo dashboards

---

## ✅ Current Working Features

### 🏠 House Management

* Create & manage farm houses (shed/house units)
* Track capacity, status, and utilization

### 🐣 Batch Management

* Create new batches
* Assign batches to houses
* Track batch lifecycle (start → active → closed)

### 📝 House Event Records

* Mortality events
* Medicine administration
* Feed changes
* Environmental or abnormal incidents

### ⚖️ Weight Records

* Periodic bird weight entry
* Growth tracking per batch & house
* Early detection of growth deviation

---

## 🚧 Upcoming (Short‑Term) Features

### 🐔 Bird Allocation

* Allocate birds dynamically across houses
* Track inter‑house movement history

### 📦 Stock Management

* Feed inventory
* Medicine inventory
* Consumables (vaccines, disinfectants, tools)

### 🛒 Purchase Management

* Purchase items (feed, medicine, equipment)
* Supplier tracking
* Price history

### 💰 Sales

* Sell birds
* Sell farm items
* Track customer & sale history

### 📊 Batch History & Analytics

* Full batch timeline
* Mortality %, FCR, growth rate
* Profit/Loss per batch

### 💼 Financial Section

* Expense tracking
* Income tracking
* Cash flow overview

### 📑 Report Generation

* Daily / weekly / batch reports
* Exportable formats (PDF/CSV later)

---

## 🚀 Advanced / Long‑Term Features (AI‑Powered)

> These features will be **data‑dependent**. No fake AI promises.

### 📅 Smart Dates

* Recommended bird selling date
* Chicks purchase planning

### 📈 Market Prediction (AI)

* X‑day market price prediction

  * Live bird price
  * Chick price
* Uses historical + external signals

### 🦠 Disease Detection System

* Pattern‑based anomaly detection
* Mortality + symptom correlation
* Early warning alerts (not diagnosis claims)

### 🤖 AI Farm Decision Suggester

* Feed strategy suggestions
* Sell vs hold recommendations
* Risk warnings

---

## 🧱 System Architecture (High Level)

```
Frontend   →  React / Next.js + Tailwind + shadcn/ui
Backend    →  Nextjs (future plan is go with Golang)
Database   →  PostgreSQL (Drizzle ORM)
Cache      →  Redis
AI Layer   →  Modular (local + cloud models)
```

---

## 🧩 Core Domain Concepts

### Entities

* Farm
* House
* Batch
* Bird
* Stock Item
* Purchase
* Sale
* Payment Instrument
* Ledger Entry

### Design Principles

* Event‑driven records (nothing magical)
* Immutable history (no silent data loss)
* Explicit ownership (farm, supplier, customer)

---

## 🔐 Data Transparency Policy

* **Free plan users:**

  * Data may be stored in a public or shared repository
  * Clearly stated before signup

* **Paid users:**

  * Private data
  * Isolated storage

No hidden clauses. No dark patterns.

---

## 🧪 Status

* ⚙️ Actively developed
* 🧠 Logic evolves with farm reality
* 📉 Features removed if they don’t add value

---

## 📌 Non‑Goals (Explicit)

* ❌ Becoming a bloated enterprise ERP
* ❌ Chasing generic SaaS users
* ❌ AI hype without measurable ROI

---

## 🛠 Internal Development Notes

* Schema‑first design
* Zod for validation
* Strong typing across layers
* Domain logic > UI tricks

---

## 📍 Roadmap Direction

1. Farm profitability accuracy
2. Batch‑level intelligence
3. Predictive decision support
4. Automation only where it saves money

---

## 🤝 Contribution

Currently **closed‑core**.
Selective collaboration possible if it improves real farm outcomes.

---

## 📄 License

License will be defined once the system stabilizes.
Until then: **All rights reserved**.

---

## ✍️ Author

**AFIF ZILANI**
Entrepreneur & Programmer
Builder of systems that must survive real‑world pressure.

---

> If a feature doesn’t increase profit, reduce loss, or improve decision clarity — it doesn’t belong here.
