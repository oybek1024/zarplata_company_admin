const permissions = ['home','contact', 'login', '404']

function guard (route) {
    let _isHave = false
    if (permissions.includes(route)) _isHave = !_isHave
    return _isHave
}

export default guard
