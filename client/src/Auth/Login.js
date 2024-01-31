const Login = () => {
    return (
        <div className="auth-main flex h-screen items-center justify-center bg-background relative z-0">
            <div className="rounded-3xl py-12  gap-8 flex flex-col items-center justify-center w-3/4 bg-primary">
                <h1 className="text-3xl text-white"><b>Turbo</b>Talk</h1>
                <div className="bg-white  gap-10 rounded-lg py-12 px-10 w-2/4 flex">
                    <div className="flex-1">
                        <p className="text-lg font-bold mb-1 text-textPrimary">Login </p>
                        <p className="text-sm text-textSecondary">Start your journey here</p>
                        <div className="flex flex-col gap-1 mt-8">
                            <label className="text-xs font-semibold uppercase text-textPrimary">Username</label>
                            <input type="text" className="auth-input"  placeholder="Enter Username"/>
                        </div>
                        <div className="flex flex-col gap-1 mt-4">
                            <label className="text-xs font-semibold uppercase text-textPrimary">Password</label>
                            <input type="text" className="auth-input"  placeholder="Enter password"/>
                        </div>
                       
                        <button className="auth-btn mt-8">Login</button>
                        <hr className="my-6"/>
                        <p className="text-sm text-center font-semibold text-textPrimary"> Don't have account ? <span className="text-secondary">Sigin</span></p>
                    </div>
                    {/* <div className="border ">
                        imag
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Login;