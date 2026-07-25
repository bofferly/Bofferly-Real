================================================================================
BOFFERLY ISLAMIC PORTAL - WORDPRESS THEME INSTALLATION GUIDE
================================================================================

Theme Name: Bofferly Islamic Portal Theme
Version: 1.0.0
Author: Bofferly Development Team
Target Platform: WordPress 5.8+ / 6.x

--------------------------------------------------------------------------------
HOW TO INSTALL & UPLOAD TO YOUR WORDPRESS DASHBOARD
--------------------------------------------------------------------------------

1. STEP 1: DOWNLOAD OR ZIP THE THEME FOLDER
   - Zip the `/wordpress-theme` directory on your local machine into a file named `bofferly-theme.zip`.
   - Ensure `style.css` and `functions.php` are directly inside the root of `bofferly-theme.zip`.

2. STEP 2: UPLOAD TO WORDPRESS
   - Log in to your WordPress Admin Dashboard (`https://yourdomain.com/wp-admin`).
   - Navigate to: **Appearance > Themes**.
   - Click the **Add New** button at the top, then click **Upload Theme**.
   - Choose the `bofferly-theme.zip` file and click **Install Now**.
   - Once uploaded, click **Activate**.

3. STEP 3: CONFIGURE WORDPRESS DASHBOARD INTEGRATION
   - Go to your WordPress Dashboard menu. You will notice new Custom Post Types created by the theme:
     * **Fatwas & Rulings** (Manage Fatwa submissions and responses)
     * **Mosque Directory** (Add & edit local mosques and prayer times)
     * **Academy Courses** (Manage online Islamic courses)
   - Go to **Settings > General** or use the custom REST API endpoints provided at `/wp-json/bofferly/v1/settings` to sync settings with this React application.

4. STEP 4: WORDPRESS REST API SYNCHRONIZATION
   - The theme automatically exposes WP REST API endpoints at:
     `/wp-json/wp/v2/posts` (Blog Posts)
     `/wp-json/wp/v2/fatwa` (Fatwas)
     `/wp-json/wp/v2/mosque` (Mosque Directory)
     `/wp-json/bofferly/v1/settings` (Zakat & Nisab settings)

--------------------------------------------------------------------------------
SUPPORT & CUSTOMIZATION
--------------------------------------------------------------------------------
For support, visit: https://bofferly.org
License: GPLv2 or later
