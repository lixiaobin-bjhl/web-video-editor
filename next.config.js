/** @type {import('next').NextConfig} */
/* eslint-disable no-undef */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            sharp: 'commonjs sharp',
            canvas: 'commonjs canvas',
        })
        return config
    },
}

module.exports = nextConfig
