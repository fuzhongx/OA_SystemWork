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