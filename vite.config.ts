import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // 가로채다
        proxy: {
            "/api": { target: "http://localhost:2999" },
        },
    },
});
