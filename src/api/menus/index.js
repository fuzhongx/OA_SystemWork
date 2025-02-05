import service from '@/util/requert'

export function menusApi(){
    return service({
        url:'/api/ent/user/menus',
        method:'get'
    })
}
