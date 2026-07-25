<?php
/**
 * Bofferly Islamic Portal Theme Functions
 * 
 * @package Bofferly
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// 1. Theme Setup
function bofferly_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register Navigation Menus
    register_nav_menus(array(
        'primary-menu' => __('Primary Header Menu', 'bofferly'),
        'footer-menu'  => __('Footer Navigation Menu', 'bofferly'),
    ));
}
add_action('after_setup_theme', 'bofferly_theme_setup');

// 2. Enqueue Scripts & Styles
function bofferly_enqueue_assets() {
    // Theme stylesheet
    wp_enqueue_style('bofferly-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Tailwind & Lucide Icon CDNs if needed
    wp_enqueue_style('tailwindcss', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', array(), '2.2.19');
    
    // Custom React Application Bundle (when compiled into dist/assets)
    $assets_dir = get_template_directory() . '/dist/assets/';
    if (is_dir($assets_dir)) {
        $files = scandir($assets_dir);
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
                wp_enqueue_script('bofferly-app-' . md5($file), get_template_directory_uri() . '/dist/assets/' . $file, array(), '1.0.0', true);
            }
            if (pathinfo($file, PATHINFO_EXTENSION) === 'css') {
                wp_enqueue_style('bofferly-app-style-' . md5($file), get_template_directory_uri() . '/dist/assets/' . $file, array(), '1.0.0');
            }
        }
    }
}
add_action('wp_enqueue_scripts', 'bofferly_enqueue_assets');

// 3. Register Custom Post Types for Islamic Content
function bofferly_register_custom_post_types() {
    // Fatwa CPT
    register_post_type('fatwa', array(
        'labels' => array(
            'name' => __('Fatwas & Rulings', 'bofferly'),
            'singular_name' => __('Fatwa', 'bofferly'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'supports' => array('title', 'editor', 'author', 'custom-fields', 'comments'),
        'show_in_rest' => true,
    ));

    // Mosques CPT
    register_post_type('mosque', array(
        'labels' => array(
            'name' => __('Mosque Directory', 'bofferly'),
            'singular_name' => __('Mosque', 'bofferly'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-admin-multisite',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest' => true,
    ));

    // Academy Courses CPT
    register_post_type('academy_course', array(
        'labels' => array(
            'name' => __('Academy Courses', 'bofferly'),
            'singular_name' => __('Academy Course', 'bofferly'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-welcome-write-blog',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true,
    ));
}
add_action('init', 'bofferly_register_custom_post_types');

// 4. Custom REST API Endpoints for React Frontend Synchronization
add_action('rest_api_init', function () {
    register_rest_route('bofferly/v1', '/settings', array(
        'methods' => 'GET',
        'callback' => 'bofferly_get_platform_settings',
        'permission_callback' => '__return_true',
    ));
});

function bofferly_get_platform_settings() {
    return array(
        'nisab_gold' => get_option('bofferly_nisab_gold', '6850.00'),
        'nisab_silver' => get_option('bofferly_nisab_silver', '580.00'),
        'announcement' => get_option('bofferly_announcement', 'Welcome to Bofferly Islamic Portal'),
        'ramadan_active' => get_option('bofferly_ramadan_active', true),
    );
}
