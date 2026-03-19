const API_BASE_URL = "http://localhost:8443";

const outputEl = document.getElementById("output");
let accessToken = null;

function print(data) {
    outputEl.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

async function request(path, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(body.error || `HTTP ${response.status}`);
    }
    return body;
}

document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const payload = {
            username: document.getElementById("regUsername").value,
            email: document.getElementById("regEmail").value,
            password: document.getElementById("regPassword").value
        };
        const data = await request("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(payload)
        });
        accessToken = data.token;
        print(data);
    } catch (error) {
        print(error.message);
    }
});

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const payload = {
            username: document.getElementById("loginUsername").value,
            password: document.getElementById("loginPassword").value
        };
        const data = await request("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(payload)
        });
        accessToken = data.token;
        print(data);
    } catch (error) {
        print(error.message);
    }
});

document.getElementById("loadProfileBtn").addEventListener("click", async () => {
    try {
        const data = await request("/api/secure/profile", { method: "GET" });
        print(data);
    } catch (error) {
        print(error.message);
    }
});
