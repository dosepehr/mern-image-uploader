/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                IranSans: ['IRANSansWeb', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};

