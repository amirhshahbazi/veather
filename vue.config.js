module.exports = {
    pwa: {
        name: 'Veather',
        short_name: "Veather",
        description: "Veather, a weather application with Vue",
        start_url: "./index.html",
        display: "standalone",
        themeColor: '#2a2157',
        // msTileColor: '#fff',
        // appleMobileWebAppCapable: 'yes',
        // appleMobileWebAppStatusBarStyle: 'black',
        // display: "fullscreen",
        icons: [
            {
                src: "/src/assets/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "/src/assets/icons/icon-256x256.png",
                sizes: "256x256",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "/src/assets/icons/icon-384x384.png",
                sizes: "384x384",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                src: "/src/assets/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            }
        ],

        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
        }
    }
}
