# Spring HTTPS and Let's Encrypt Guide

## Goal

Serve Spring API using TLS and Let's Encrypt certificates.

## Option A: Spring serves HTTPS directly (PKCS12)

1. Obtain certificate with certbot on the Spring server domain.
2. Convert cert + private key to PKCS12:

```bash
sudo openssl pkcs12 -export \
  -in /etc/letsencrypt/live/your-api-domain.example.com/fullchain.pem \
  -inkey /etc/letsencrypt/live/your-api-domain.example.com/privkey.pem \
  -out /opt/security-app/keystore.p12 \
  -name spring \
  -password pass:ChangeThisPassword
```

3. Configure Spring (`application.properties` or env vars):

```properties
server.port=8443
server.ssl.enabled=true
server.ssl.key-store=file:/opt/security-app/keystore.p12
server.ssl.key-store-password=ChangeThisPassword
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=spring
```

## Option B: Reverse proxy terminates TLS (recommended in production)

- Use Apache/Nginx in front with Let's Encrypt.
- Spring can stay on internal HTTP/HTTPS port, not publicly exposed.

## Certificate Renewal

Let's Encrypt certs expire every 90 days. Configure automated renewal:

```bash
sudo certbot renew --dry-run
```

Then restart/reload relevant service after renewal.

## Security Notes

- Restrict port `8443` with security groups.
- Use strong file permissions on cert and keystore files.
- Prefer private subnet + load balancer for production architecture.
