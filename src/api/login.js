import service from '@/util/requert'

export function getKey(){
    return service({
        url:'/api/ent/common/captcha',
        method:'get'
    })
}
export function admin(data){
  return  service({
    url:'/api/ent/user/login',
    method:'post',
    data
  }) 
}
export function menus(params){
    return  service({
      url:'/api/ent/user/menus',
      method:'get',
      params
    }) 
  }