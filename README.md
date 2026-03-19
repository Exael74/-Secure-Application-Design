# Enterprise Architecture Workshop - Security Application Design

This repository contains the full lab implementation except deployment/GitHub management.

## Project Structure

- `apache-client/`: Async HTML + JavaScript client to be served by Apache over TLS.
- `spring-server/`: Spring Boot backend with secure login and hashed password storage.
- `docs/`: Architecture and deployment/security guidance for AWS + Let's Encrypt.

## Lab Requirements Mapping

1. **Apache server serving async client with TLS**
   - Client files are in `apache-client/`.
   - Apache TLS virtual host example is in `docs/apache-vhost-example.conf`.

2. **Spring server with REST API protected with TLS**
   - REST backend is in `spring-server/`.
   - TLS setup details are in `docs/spring-https-and-letsencrypt.md`.

3. **Login security with hashed passwords**
   - User registration/login endpoints implemented in `spring-server`.
   - Passwords are hashed using BCrypt before persistence.

4. **AWS deployment guidance**
   - Step-by-step runbook in `docs/aws-deployment-runbook.md`.

5. **Architecture design document**
   - See `docs/architecture-design.md`.

## Backend API

Base URL (example): `https://<SPRING_HOST>:8443`

### Register

`POST /api/auth/register`

```json
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "StrongPass123"
}
```

Returns token.

### Login

`POST /api/auth/login`

```json
{
  "username": "alice",
  "password": "StrongPass123"
}
```

Returns token.

### Protected endpoint

`GET /api/secure/profile`

Header: `Authorization: Bearer <token>`

## Local Run (without deployment)

### Spring backend

```bash
cd spring-server
mvn clean spring-boot:run
```

Default URL: `http://localhost:8443` when SSL disabled, or `https://localhost:8443` when SSL is enabled with keystore.

### Apache client (quick local test)

Serve `apache-client/` with any static server or Apache.
Update `API_BASE_URL` in `apache-client/app.js` to your Spring server URL.

## Deliverables Checklist

- Source code ready: yes
- Architecture document: yes
- Deployment instructions: yes
- TLS and Let's Encrypt instructions: yes
- Security implementation (login + hash): yes
- README with instructions: yes

## Notes

- You said you will handle deployment and GitHub submission.
- Add screenshots and demo video after deployment/testing in AWS.
