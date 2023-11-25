const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#0056B3', // Add this line under extend
            }
        },
    },
    plugins: [],
});
