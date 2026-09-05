<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title inertia>{{ config('app.name', 'Syedpur Fisheries & Farms') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="96x96" href="/images/brand/favicon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/images/brand/favicon.png" />
    <meta name="theme-color" content="#1B5E20" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
    />

    <!-- Inertia -->
    @inertiaHead

    <!-- Vite -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</head>
<body class="antialiased">
    @inertia
</body>
</html>
