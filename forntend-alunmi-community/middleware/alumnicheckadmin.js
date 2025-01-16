
export default  function({$auth,redirect}){
    const user = $auth.state.user
    if(user){
        if(user.role===0){
            // console.log()
        }
    else if((user.role===1)||(user.role===2)){
        redirect('/admin/')
    }
    }
    else {
        redirect('/login/')
    }
    
}


