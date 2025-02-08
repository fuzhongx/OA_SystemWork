import service from '@/util/requert'

export function getDaiBan(data){
    return service({
        url:'/api/ent/schedule/index',
        method:'post',
        data
    })
}
export function getDaiBan_Type(params){
    return service({
        url:'/api/ent/schedule/types',
        method:'get',
        params
    })
}
export function getDaiBan_Message(params){
    return service({
        url:'/api/ent/company/message',
        method:'get',
        params
    })
}
export function getKuaijieRukou_menus(params){
    return service({
        url:'/api/ent/user/work/menus',
        method:'get',
        params
    })
}
export function getQiyeDongtai_list(params){
    return service({
        url:'/api/ent/notice/list',
        method:'get',
        params
    })
}
export function yejiTongji_list(params){
    return service({
        url:'api/ent/user/work/statistics/0',
        method:'get',
        params
    })
}
export function TOP_list(params){
    return service({
        url:'api/ent/user/work/count',
        method:'get',
        params
    })
}