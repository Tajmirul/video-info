module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "./*.html"
],
    theme: {
        extend: {
            "fontFamily": {
                "raleway": ["Raleway", "sans-serif"],
                "roboto": ["Roboto Slab", "serif"],
            },
            colors: {
                'primary': '#2148C0',
                "secondary": "#1DA7CF",
            },
        },
    },
    plugins: [],
}
