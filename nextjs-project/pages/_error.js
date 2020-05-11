import React from 'react'
import Link from 'next/link'


export default function errorPage() {
    return (
        <div>
            <h1>Oops, something went wrong</h1>
            <p>
                try going <Link href="/"><a>back</a></Link>
            </p>
        </div>
    )
}
