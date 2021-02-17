

export default function MenuKey(pathname) {
    console.log('salom')
    switch (pathname) {
        case '/': return ['1']
        case '/contact': return ['2']
        default: break
    }
}
