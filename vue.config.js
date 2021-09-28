module.exports = {
    pwa: {
        name: 'Veather',
        themeColor: '#2a2157',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        display: "fullscreen",
        icons: [
            {
                src: "./favicon.svg",
                sizes: "512x512",
                type: "image/svg+xml",
                purpose: "any maskable",
            },
        ],

        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/registerServiceWorker.js',
        }
    }
}
