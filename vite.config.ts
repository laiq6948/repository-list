import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IDEA: When using "Octokit" introduced by Github's example, add "isomorphic-fetch" package and activate the following source code.
  // resolve: {
  //   alias: {
  //     'node-fetch': 'isomorphic-fetch',
  //   },
  // },
  // define: {
  //   global: {},
  // },
});
