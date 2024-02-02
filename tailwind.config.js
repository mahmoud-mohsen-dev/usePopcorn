/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "color-primary": "#6741d9",
                "color-primary-light": "#7950f2",
                "color-text": "#dee2e6",
                "color-text-dark": "#adb5bd",
                "color-background-100": "#343a40",
                "color-background-500": "#2b3035",
                "color-background-900": "#212529",
                "color-red": "#fa5252",
                "color-red-dark": "#e03131",
            },
            height: {
                "view-70": "calc(100vh - 100px)",
            },
            minHeight: {
                "view-70": "calc(100vh - 100px)",
            },
        },
    },
    plugins: [],
};
