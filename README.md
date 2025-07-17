# 🌐 Web3 Milestone Funding Platform – Backend

This is the backend server for a decentralized funding platform built on **Hedera Hashgraph**, supporting project creation, milestone tracking, fund release, and dispute resolution. It acts as a bridge between the frontend, IPFS (for off-chain data), and smart contracts (on-chain logic).

---

## 🔧 Tech Stack

- **Node.js** + **NestJS** – RESTful API server
- **Hedera SDK** – Smart contract interactions
- **Prisma ORM** – Database modeling and access
- **IPFS (via Infura)** – Off-chain file storage 

---

## 📦 Features

### ✅ Core API
- Project creation with milestone setup
- Milestone submission and verification
- Verifier assignment (off-chain)
- Real-time voting and decision-making
- User-level project dashboards

### 🧠 Smart Contract Integration (via Hedera)
- Fund locking and milestone-based release
- On-chain milestone validation logic
- Dispute resolution triggers
- Refunds for failed or rejected milestones

### 🗃️ IPFS Integration
- Upload project metadata and milestone proofs
- Generate content-addressable hashes for blockchain
- Pinning support to ensure persistence

### 🔐 Security
- Rate limiting to prevent spam (e.g. 10 projects/hr/wallet)
- Input validation (name length, URL formats, etc.)
- Protection from SQL injection and XSS

---
