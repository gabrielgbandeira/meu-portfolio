# Portfólio: O Engenheiro de Soluções
# v1.0.0

Este é o projeto-base para o portfólio web hospedado em `primiciasschool.online`.

## Stack Tecnológica

* **Framework:** [Astro](https://astro.build/)
* **Estilização:** [TailwindCSS](https://tailwindcss.com/)
* **Animação (UI):** [GSAP (GreenSock)](https://gsap.com/)
* **Animação (Carrossel Mobile):** [Swiper.js](https://swiperjs.com/)
* **Backend (Formulário):** [Formspree](https://formspree.io/)

## Como Instalar e Rodar

1.  **Clone o repositório (ou tenha os arquivos).**

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração do Formulário:**
    * Abra o arquivo `src/components/Contact.astro`.
    * Encontre a linha: `action="https://formspree.io/f/YOUR_UNIQUE_ID"`
    * Substitua `YOUR_UNIQUE_ID` pelo seu ID real do Formspree (que está enviando para `gabrielgobandeira@gmail.com`).

4.  **Rode o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Acesse `http://localhost:4321` no seu navegador.

## Scripts Principais

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Gera a versão final e otimizada do site na pasta `/dist/`.
* `npm run preview`: Visualiza a versão de "build" localmente.