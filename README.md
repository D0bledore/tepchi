# Tepchi Skrädderi & Kemtvätt

## Navbar Redesign Notes

- **Dynamic Links** – Links to front-page sections are shown only on `index.html`. Pages using the shared `header.html` omit these anchors to avoid broken navigation.
- **Sticky Header** – The entire header remains `position: sticky` so navigation stays visible while scrolling.
- **Compact Layout** – Navigation and logo are arranged with flexbox. The logo doubles as a home link.
- **Mobile Menu** – A hamburger toggle reveals the menu on small screens for better usability.

These changes modernize the site and optimize space usage across devices.

## Deployment

1. Install dependencies if you haven't already:

   ```bash
   npm install
   ```

2. Build the optimized production files:

   ```bash
   npm run build
   ```

   The compiled site will be generated in the `dist/` directory.

3. Upload the contents of `dist/` to your web host or serve them locally with a static server:

   ```bash
   npm run preview
   ```

This command lets you test the production build locally. Any static hosting platform can serve the `dist/` directory for deployment.
