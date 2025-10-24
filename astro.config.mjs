import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Integrações: Adicionamos o TailwindCSS ao Astro
  integrations: [tailwind()],

  // --- ATUALIZAÇÃO: Adicione esta linha ---
  // "Avisa" o Astro que o site viverá na subpasta /gabrielbandeiradev/
  base: '/gabrielbandeiradev/',
});