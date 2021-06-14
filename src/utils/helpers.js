export const validation =(value,novalid)=>{
    if(novalid) return true
    if(value.length>=40 && value.length<=44){
        return true
    }
    return false

}
