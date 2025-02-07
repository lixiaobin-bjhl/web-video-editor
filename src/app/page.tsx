
'use client'

import * as React from 'react'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('./App').then((a) => a.App), {
    ssr: false,
})

function home() {
    return (
        <App />
    )
}

export default home
