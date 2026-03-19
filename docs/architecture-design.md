# Application Architecture Design

## Overview

This lab uses a two-server architecture on AWS EC2 instances:

- **Server 1 (Apache + TLS)**: serves asynchronous HTML/JavaScript client files.
- **Server 2 (Spring Boot + TLS)**: exposes REST endpoints for authentication and protected resources.

## Components

1. **Client Layer (Browser)**
   - HTML + JavaScript client uses `fetch` with async/await.
   - Sends JSON requests to Spring REST APIs over HTTPS.

2. **Web Delivery Layer (Apache Server)**
   - Hosts static client files.
   - Enforces TLS using Let's Encrypt certificate.
   - Can include strict transport headers (HSTS, X-Content-Type-Options, X-Frame-Options).

3. **Application Layer (Spring Server)**
   - Registration and login endpoints.
   - Password hashing with BCrypt before DB storage.
   - Token-based authorization for protected API routes.
   - TLS enabled via certificate-backed keystore.

4. **Data Layer**
   - Local H2 database for workshop/demo.
   - In production, replace with RDS (MySQL/PostgreSQL) and private networking.

## Security Strategy

- **TLS everywhere**: both Apache and Spring endpoints served over HTTPS.
- **Credential protection**: passwords are never stored in plaintext, only BCrypt hash.
- **Authentication and authorization**: token required for protected endpoints.
- **Network segmentation (AWS)**: use security groups to allow only required inbound ports.

## Request Flow

1. User opens Apache-hosted client via HTTPS.
2. Client sends async login/register request to Spring HTTPS API.
3. Spring validates credentials and returns token.
4. Client sends token in `Authorization: Bearer` header for protected API calls.
5. Spring filter validates token and authorizes access.

## AWS Logical Topology

- `EC2-Apache` (public): ports 80/443 open.
- `EC2-Spring` (public or private behind reverse proxy): port 8443 open only to trusted sources.
- Optional `RDS` in private subnet for persistent production data.

## Scalability Notes

- Apache and Spring scale independently by role.
- Introduce Load Balancer and Auto Scaling Groups for production scaling.
- Move token/session store to Redis for multi-instance backend scaling.
