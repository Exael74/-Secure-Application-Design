# Enterprise Architecture Workshop: Secure Application Design

This repository contains the full implementation for the Secure Application Design workshop. It demonstrates a secure, scalable application utilizing AWS infrastructure with a strong focus on security best practices.

## Overview

The architecture features two primary components:

1. **Server 1: Apache Server**
   Responsible for serving an asynchronous HTML+JavaScript client over a secure connection using TLS. Client-side code is delivered through encrypted channels, ensuring data integrity and confidentiality during download.
2. **Server 2: Spring Framework**
   Handles backend services, offering RESTful API endpoints. These services are protected using TLS, ensuring secure communication between the client and the backend.

### Key Security Features Implemented
- **TLS Encryption:** Secure transmission of data using TLS certificates generated through Let’s Encrypt.
- **Asynchronous Client:** HTML+JavaScript client leverages async techniques (`fetch` API) to optimize performance.
- **Login Security:** Password authentication is implemented, with passwords securely stored as hashes (BCrypt).
- **AWS Deployment:** Designed to be deployed on AWS EC2 instances securely.

## Final Deliverables

### 1. Application Architecture Design
A detailed design document outlining the relationship between Apache, Spring, and the async HTML+JS client.
[View Architecture Design Document](docs/architecture-design.md)

### 2. Instructions for Deployment
Detailed instructions for setting up the Apache and Spring servers on AWS, including Let's Encrypt TLS configuration.
[View AWS Deployment Runbook](docs/aws-deployment-runbook.md)
[View Spring TLS Setup Guide](docs/spring-https-and-letsencrypt.md)

### 3. Source Code
- **Client Code:** Located in the [`apache-client/`](apache-client/) directory.
- **Backend Code:** Located in the [`spring-server/`](spring-server/) directory.

---

## Evaluation Evidence
### Screenshots from Testing


- [ ] Screenshot 1: Client loaded securely via HTTPS (Apache).
- [ ] Screenshot 2: Successful registration showing encrypted password in database.
- [ ] Screenshot 3: Successful login returning a Bearer token.
- [ ] Screenshot 4: Successful API request to protected endpoint using the returned token over HTTPS.

### Video Demonstration

- **Video URL:** `[Insert link to YouTube/Vimeo/Drive video here]`

---

## Local Development (Testing before AWS)

### Run Spring Backend
```bash
cd spring-server
mvn clean spring-boot:run
```
*Available at `http://localhost:8443` (TLS is disabled by default locally to facilitate testing).*

### Run Apache Client
Serve the `apache-client/` directory using any local web server. Ensure `API_BASE_URL` in `app.js` is set to `http://localhost:8443` for local tests.
