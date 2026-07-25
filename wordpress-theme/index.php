<?php
/**
 * Main Template File for Bofferly WordPress Theme
 */

get_header(); ?>

<main id="root" class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-8">
        <?php
        if (have_posts()) :
            while (have_posts()) : the_post();
                the_content();
            endwhile;
        else :
            echo '<p>Welcome to Bofferly Islamic Portal for WordPress.</p>';
        endif;
        ?>
    </div>
</main>

<?php get_footer(); ?>
