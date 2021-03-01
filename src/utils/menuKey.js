import router from "@/constants/router"
import guard from "@/utils/permissions";
let generatedRoutes = []
function keyGenerator (routes) {
        routes.filter(e => guard(e.meta.permission) && !e.hidden).forEach(e => {
            if (e.children) {
                generatedRoutes.push(e.path)
                keyGenerator(e.children)
            } else {
                generatedRoutes.push(e.path)
            }
        })
}
export default function MenuKey (pathname) {
    keyGenerator(router)
    for (let i = 0; i < generatedRoutes.length; i ++) {
        if (pathname === generatedRoutes[i]) {
            console.log([(i+1).toString()])
            return [(i+1).toString()]
        }
    }
    console.log('GeneratedRoutes', generatedRoutes)
    // switch (pathname) {
    //     case '/': return ['1']
    //     case '/contact': return ['2']
    //     case '/celebrity': return ['3']
    //     case '/clients': return ['4']
    //     default: break
    // }
}
