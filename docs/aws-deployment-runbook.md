# AWS Deployment Runbook

## 1. Create EC2 instances

- Instance A: Apache client server
- Instance B: Spring backend server
- Amazon Linux 2023 recommended

## 2. Security Groups

### Apache instance
- Inbound: 80 (HTTP), 443 (HTTPS), 22 (SSH limited)

### Spring instance
- Inbound: 8443 (HTTPS API) from trusted sources only
- Optional: 22 (SSH limited)

## 3. Configure Apache server

Follow AWS LAMP base steps:
https://docs.aws.amazon.com/linux/al2023/ug/ec2-lamp-amazon-linux-2023.html

Then:
- Copy `apache-client/` contents to web root.
- Enable TLS with certbot and vhost from `docs/apache-vhost-example.conf`.

## 4. Configure Spring server

- Install Java 21 and Maven.
- Copy `spring-server/` project.
- Build and run:

```bash
cd spring-server
mvn clean package
java -jar target/security-app-1.0.0.jar
```

- Enable TLS as documented in `docs/spring-https-and-letsencrypt.md`.

## 5. Client/API integration

In `apache-client/app.js`, set:

```js
const API_BASE_URL = "https://your-api-domain.example.com:8443";
```

## 6. Validation checklist

- Apache serves client via HTTPS
- Spring APIs respond via HTTPS
- Register creates user and stores hashed password
- Login returns token
- Protected endpoint requires valid Bearer token

## 7. Evidence for submission

- Screenshots of HTTPS client page and API test
- Screenshot of DB record showing hashed password (no plaintext)
- README + architecture document + video demo
