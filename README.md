📸 Photo Gallery
A modern photo gallery application built with React, TypeScript, and Vite. The app supports infinite scrolling, allowing users to browse a collection of images seamlessly.

🚀 Features
✅ Infinite scrolling for smooth image loading
✅ Responsive design for mobile and desktop
✅ Optimized performance using Vite
✅ TypeScript for better code maintainability

🛠 Tech Stack
React – UI framework

TypeScript – Type safety

Vite – Fast development and build tool

ESLint – Code linting

🎥 Demo
🔗 Live Demo (Добавь ссылку на деплой, например Vercel/Netlify)

📦 Installation
Follow these steps to run the project locally:

bash
Копировать
Редактировать
# Clone the repository  
git clone https://github.com/AnitaA19/photo-gallery.git  

# Navigate to the project folder  
cd photo-gallery  

# Install dependencies  
npm install  

# Start the development server  
npm run dev  

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
