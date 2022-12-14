/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html'
    ],
    theme: {
        extend: {
            colors: {
                'content-blue': '#0079BD',
                'modal-wrapper-color': "rgb(88,86,86,0.8)",
                'modal-bg-color': "rgba(255,255,255,1.0)"
            },
            fontFamily: {
                Inter: ['Inter', "sans-serif"]
            },
            keyframes: {
                spin: {
                    '0%': {transform: 'rotate(0.0deg)'},
                    '100%': {transform: 'rotate(360.0deg)'}
                }
            }
        }
    },
}
