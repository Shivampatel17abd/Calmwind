import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Frontend calls /api/v1/... ; Vite forwards to the local backend.
      // This keeps requests same-origin in dev, so httpOnly auth cookies work
      // without depending on the backend CORS_ORIGIN setting.
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("error", (err, req, res) => {
            // Gracefully handle connection refused when backend is offline
            if (res && !res.headersSent) {
              res.writeHead(503, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  statusCode: 503,
                  success: false,
                  data: [],
                  message:
                    "Backend server is offline at port 8000. Operating in local mode.",
                })
              );
            }
          });
        },
      },
    },
  },
});
