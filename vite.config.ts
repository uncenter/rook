import { defineConfig } from 'vite';

import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import TurboConsole from 'unplugin-turbo-console/vite';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [
		Vue(),
		AutoImport({
			imports: ['vue', '@vueuse/core'],
			dts: true,
			vueTemplate: true,
		}),
		TurboConsole(),
	],

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
