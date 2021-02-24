import router from "@/constants/router"

let generatedRoutes = []
function keyGenerator (routes) {
    return new Promise(resolve => {
        routes.forEach(e => {
            if (e.children) {
                generatedRoutes.push(e.path)
                keyGenerator(e.children)
            } else {
                generatedRoutes.push(e.path)
            }
        })
        resolve(generatedRoutes)
    })
}
export default function MenuKey (pathname) {
    keyGenerator(router).then(genereted => {
        for (let i = 0; i < genereted.length; i ++) {
            if (pathname === genereted[i]) return [(i+1).toString()]
        }
    })
    console.log('GeneratedRoutes', generatedRoutes)
    // switch (pathname) {
    //     case '/': return ['1']
    //     case '/contact': return ['2']
    //     case '/celebrity': return ['3']
    //     case '/clients': return ['4']
    //     default: break
    // }
}
