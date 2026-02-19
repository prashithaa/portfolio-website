import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://louisabraham.github.io/nekojs/neko.js'
    script.setAttribute('data-autostart', 'true')
    script.async = true
    document.body.appendChild(script)
  }, [])

  return <Component {...pageProps} />
}

export default MyApp