import globals from "globals";
import js from '@eslint/js'
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import stylisticJs from '@stylistic/eslint-plugin-js'


export default defineConfig([
    js.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        }
    },
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            '@stylistic/js/indent': ['error', 2],
            '@stylistic/js/linebreak-style': ['error', 'unix'],
            '@stylistic/js/quotes': ['error', 'single'],
            '@stylistic/js/semi': ['error', 'never'],
            'eqeqeq': 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'no-console': 'off',
        },
    },
]);
