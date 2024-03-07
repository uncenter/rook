import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [vue()],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`.
	//
	// 1. Prevent vite from obscuring Rust errors.
	clearScreen: false,
	// 2. Tauri expects a fixed port, fail if that port is not available.
	server: {
		port: 1420,
		strictPort: true,
		watch: {
			// 3. Tell Vite to ignore watching `src-tauri`.
			ignored: ['**/src-tauri/**'],
		},
	},
}));
