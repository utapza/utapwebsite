# Remote dev client (tunnel workaround)

When `npx expo start --dev-client --tunnel` fails with **"failed to start tunnel"** or **"remote gone away"**, Expo’s built-in tunnel (exp.direct) is unstable on your network. Use this workaround to expose Metro with standalone ngrok.

## Steps

### 1. Start Metro (no tunnel)

In **terminal 1**:

```bash
npm run dev:tunnel:manual
```

(or `npx expo start --dev-client --scheme utap`)

Leave this running. Metro will be at `http://localhost:8081`.

### 2. Expose port 8081 with ngrok

In **terminal 2**:

```bash
ngrok http 8081
```

Use the [ngrok CLI](https://ngrok.com/download) (e.g. `brew install ngrok`). Sign in and set your auth token if required:

```bash
export NGROK_AUTH_TOKEN=your_token_from_ngrok_dashboard
ngrok http 8081
```

ngrok will print a public URL, e.g.:

- **Forwarding** `https://abc123.ngrok-free.app` -> `http://localhost:8081`

### 3. Give the URL to your client

On the **iPhone dev build**:

1. Open the app.
2. Shake device (or use the dev menu) → **“Configure Bundler”** / **“Enter URL manually”**.
3. Enter one of these (replace with your ngrok host):

   - **Preferred:**  
     `https://YOUR-NGROK-SUBDOMAIN.ngrok-free.app`  
     e.g. `https://abc123.ngrok-free.app`

   - If the app expects an `exp://` URL, try:  
     `exp://YOUR-NGROK-SUBDOMAIN.ngrok-free.app:443`

The app will load the bundle from your machine via the ngrok URL.

## Why the built-in tunnel fails

Expo’s tunnel uses **exp.direct** hostnames. The log shows the tunnel being stopped and retried (“Resetting project randomness”, “Stopping Tunnel”) then “remote gone away”. That usually means:

- Unstable connection to Expo’s tunnel service, or  
- Network/firewall/proxy closing the connection.

Using **standalone ngrok** avoids Expo’s tunnel and gives a stable `https://….ngrok-free.app` URL.

## Same Wi‑Fi (no tunnel)

If the client is on the **same Wi‑Fi** as you:

1. Run: `npx expo start --dev-client --scheme utap`
2. In the terminal you’ll see a LAN URL, e.g. `exp://192.168.1.10:8081`
3. On the device: **Configure Bundler** → enter that URL

No ngrok or tunnel needed.
