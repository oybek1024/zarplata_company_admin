

export default function MenuKey(pathname) {
    console.log('salom')
    switch (pathname) {
        case '/': return ['1']
        case '/contact': return ['2']
        case '/celebrity': return ['3']
        case '/clients': return ['4']
        default: break
    }
}
