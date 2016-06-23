<html>
<head>
    <title>Angular 2 QuickStart</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/app.css">

    <!-- Polyfill(s) for older browsers -->
    <script src="es6-shim/es6-shim.min.js"></script>

    <script src="zone.js/dist/zone.js"></script>
    <script src="reflect-metadata/Reflect.js"></script>
    <script src="systemjs/dist/system.src.js"></script>

    <script src="systemjs.config.js"></script>
    <script>
        System.config({
            "defaultJSExtensions": true,
            packages: {
                app: {
                    format: 'register',
                    defaultExtension: 'js'
                }
            }
        });


        System.import('typescript/boot')
                .then(null, console.error.bind(console));
    </script>
    <base href="/">
</head>

<body>
    <app>

    </app>
</body>
</html>