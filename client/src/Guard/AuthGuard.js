const AuthGuard=({children})=>{
    const isLogin=false;
    if(isLogin){
        return children;
    }
    return (
        <div>
            You are not authorized
        </div>
    )
}

export default AuthGuard;