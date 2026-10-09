# 🏦 Core Financial Settlement & Double-Entry Ledger Engine

[![Java 21](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot 3.x](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-ACID-blue.svg)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Distributed%20Lock-red.svg)](https://redis.io/)
[![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-Outbox%20Streaming-orange.svg)](https://kafka.apache.org/)

An enterprise-grade, distributed **Core Financial Settlement & Double-Entry Ledger Engine** modeled after modern banking rails and payment platforms like Stripe and Adyen. Designed from the ground up for zero-drift financial accuracy, high concurrency, strict idempotency, and reliable event streaming.

---

## 🚀 Key Architectural Invariants

* **Strict Immutability (Append-Only):** Ledger entry rows are never updated or deleted. Corrections are handled exclusively via compensating reversal transactions.
* **Zero-Sum Balance Rule:** Every multi-leg transaction must satisfy $\sum \text{Debits} - \sum \text{Credits} = 0$ before touching account balances.
* **Pessimistic Row-Level Locking:** Accounts are protected using database-level row locks (`SELECT ... FOR UPDATE`) sorted lexicographically to eliminate deadlocks.
* **Distributed Idempotency:** Guarded by Redis (`SETNX` and cryptographic request fingerprinting) to instantly return cached receipts or reject concurrent duplicate requests with an HTTP `409 Conflict`.
* **Transactional Outbox Pattern:** Database updates and outgoing message payloads are committed within the exact same atomic transaction, ensuring zero data loss before asynchronous relay to Apache Kafka.

---

## 📦 Technology Stack & Dependencies

The project is built on a high-performance modern tech stack optimized for massive throughput and thread efficiency:

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & Language** | Java 21 | Leverages **Virtual Threads** (Project Loom) to handle thousands of concurrent I/O-bound requests with minimal memory overhead. |
| **Framework** | Spring Boot 3.x | Core application container managing REST controllers, dependency injection, and declarative transactions (`@Transactional`). |
| **Relational Vault** | PostgreSQL | Single source of truth providing strict ACID guarantees, constraints, and pessimistic locking. |
| **Concurrency Shield** | Redis | In-memory key-value store for atomic distributed locks, request deduplication, and TTL response caching. |
| **Event Streaming** | Apache Kafka | Distributed message broker receiving completed settlement events from the outbox relay. |
| **Container Runtime** | Docker & Docker Compose | Local orchestration for isolated PostgreSQL, Redis, and Kafka infrastructure. |

### Core Project Dependencies (Maven `pom.xml` / Gradle `build.gradle` Reference)
* `spring-boot-starter-web` (REST API & Embedded Tomcat/Undertow)
* `spring-boot-starter-data-jpa` (Hibernate ORM & Database Persistence)
* `spring-boot-starter-data-redis` (Jedis/Lettuce Redis client integration)
* `spring-kafka` (Apache Kafka producer/consumer template support)
* `postgresql` (PostgreSQL JDBC Driver)
* `lombok` (Boilerplate reduction)
* `flyway-core` / `liquibase-core` *(Optional)* (Database schema migration versioning)

---

## 📁 Repository Structure

```text
com.fintech.ledger
│
├── LedgerApplication.java       # Spring Boot main entry point & thread configuration
│
├── gateway                      # REST controllers, DTO data contracts, and global exception handlers
├── deduplication                # Redis distributed locks, payload hashing, and idempotency interceptors
├── core                         # Orchestration engine, zero-sum verification, and balance checks
├── ledger                       # Financial domain entities, enums (DEBIT/CREDIT), and custom exceptions
├── storage                      # PostgreSQL persistence, row-level locking queries, and append-only entries
└── streaming                    # Transactional outbox polling workers and Kafka event dispatchers
```

---

## 🛠️ Getting Started & Local Development

### Prerequisites
* `Java Development Kit (JDK) 21+ installed.`
* `Docker & Docker Compose for spinning up local infrastructure services.`

1. Clone the Repository
git clone [https://github.com/pankajpandey22/core-financial-ledger.git](https://github.com/pankajpandey22/core-financial-ledger.git)
cd core-financial-ledger

2. Spin Up Infrastructure Services
Start PostgreSQL, Redis, and Apache Kafka locally using Docker Compose:
docker-compose up -d

3. Configure Application Properties
Verify your src/main/resources/application.yml or application.properties points to the local database, Redis, and Kafka endpoints:
```
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ledger_db
    username: postgres
    password: password
  data:
    redis:
      host: localhost
      port: 6379
  kafka:
      bootstrap-servers: localhost:9092
```

4. Build and Run the Application
Run the Spring Boot application using your preferred build tool:
./mvnw spring-boot:run

## 📜 License
This project is licensed under the terms of the MIT License.
