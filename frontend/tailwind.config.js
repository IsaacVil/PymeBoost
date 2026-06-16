/**
 * Tailwind CSS v4 config. v4 derives most setup from `@import "tailwindcss"` and
 * `@theme` in globals.css; this file only scopes content sources for class
 * detection.
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
  ],
};
