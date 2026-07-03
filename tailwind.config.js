// /** @type {import('tailwindcss').Config} */

// module.exports = {
//     // NOTE: Update this to include the paths to all files that contain Nativewind classes.
//     content: ["./screens/Home.jsx", "./screens/Map.jsx", "./screens/Notation.jsx", "./screens/Setting.jsx", "./components/Bridge.jsx",],
//     // content: [
//     //     "./App.{js,jsx,ts,tsx}",
//     //     "./screens/**/*.{js,jsx,ts,tsx}",
//     //     "./components/**/*.{js,jsx,ts,tsx}",
//     // ],
//     presets: [require("nativewind/preset")],
//     theme: {
//         extend: {},
//     },
//     plugins: [], m
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
    // Recommendation: Use the commented-out glob patterns so new files are automatically included!
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [require("nativewind/preset")],
};