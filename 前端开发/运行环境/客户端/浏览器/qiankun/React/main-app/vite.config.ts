import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: path.resolve(process.cwd(), './src/index.tsx') // 确保入口文件是 index.tsx
		}
	}
});
