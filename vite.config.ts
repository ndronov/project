import react from '@vitejs/plugin-react-swc';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { execSync } from 'node:child_process';
import { visualizer } from 'rollup-plugin-visualizer';
import { PluginOption, defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

const isProduction = process.env.NODE_ENV === 'production';

const commitHash = execSync('git rev-parse HEAD').toString().trim();
const commitTime = execSync(`git log -1 --pretty="%cd" --date=format:"%d-%m-%Y %H:%M:%S %z"
`)
  .toString()
  .trim();
const buildTime = format(Date.now(), 'dd-MM-yyyy HH:mm:ss xxxx', { locale: ru });

export default defineConfig({
  define: {
    'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(commitHash),
    'import.meta.env.VITE_COMMIT_TIME': JSON.stringify(commitTime),
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(buildTime),
  },
  plugins: [
    svgr(),
    react(),
    ViteAliases({ useConfig: false, prefix: '@' }) as PluginOption,
    visualizer() as unknown as PluginOption,
    viteCompression({ algorithm: 'brotliCompress' }),
  ],
  css: {
    modules: {
      generateScopedName: isProduction ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
  },
});
