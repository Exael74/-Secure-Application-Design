package com.lab.securityapp.service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    private static final long TOKEN_TTL_SECONDS = 3600;

    private final Map<String, SessionToken> activeTokens = new ConcurrentHashMap<>();

    public String issueToken(String username) {
        String token = UUID.randomUUID().toString();
        activeTokens.put(token, new SessionToken(username, Instant.now().plusSeconds(TOKEN_TTL_SECONDS)));
        return token;
    }

    public String validateAndGetUsername(String token) {
        SessionToken session = activeTokens.get(token);
        if (session == null) {
            return null;
        }

        if (Instant.now().isAfter(session.expiresAt())) {
            activeTokens.remove(token);
            return null;
        }

        return session.username();
    }

    private record SessionToken(String username, Instant expiresAt) {
    }
}
