import service from "@/util/requert";

export function DaiShenPi(params){
    return service({
        url:'api/ent/approve/apply',
        method:'get',
        params
    })
}
export function DaiShenPi_list(params){
    return service({
        url:'api/ent/approve/config/search/1',
        method:'get',
        params
    })
}