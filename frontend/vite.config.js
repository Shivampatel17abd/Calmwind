import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
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
