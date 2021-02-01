const permissions = ['home', 'contact', 'login']

function guard (route) {
    let _isHave = false
    if (permissions.includes(route)) _isHave = !_isHave
    return _isHave
}

export default guard
