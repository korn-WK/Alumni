
export default  function({$auth,redirect}){
    const user = $auth.state.user
    
    if(user&&(user.role===0)){
        
        redirect('/alumni/')
    }else if(user&&((user.role===1)||(user.role===2))){
        redirect('/admin/')
    }
    else {
// console.log()
    }
    
}


