export default  function({$auth,redirect}){
    const user = $auth.state.user
    if(user&&((user.role===1)||(user.role===2))){
        // console.log()
    }else{
        redirect('/login/')

    }
}


