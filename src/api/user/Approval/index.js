import service from "@/util/requert";

export function DaiShenPi(params){
    return service({
        url:'api/ent/approve/apply',
        method:'get',
        params
    })
}