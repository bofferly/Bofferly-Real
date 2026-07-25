<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-emerald-950 text-white font-sans antialiased'); ?>>
<?php wp_body_open(); ?>
<header className="bg-emerald-950 border-b border-emerald-800 text-white p-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-extrabold text-amber-300">
            <a href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
        </h1>
        <p className="text-xs text-emerald-200"><?php bloginfo('description'); ?></p>
    </div>
</header>
