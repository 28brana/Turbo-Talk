const Signin = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="rounded-2xl p-12 gap-8 flex flex-col items-center justify-center w-3/4 bg-primary">
                <h1 className="text-3xl text-white"><b>Turbo</b>Talk</h1>
                <div className="bg-white w-full gap-10 rounded-lg p-12 flex">
                    <div className="flex-1">
                        <p className="text-lg font-bold">Signin </p>
                        <p className="text-sm">Start your journey here</p>
                        <div className="flex flex-col gap-1 mt-8">
                            <label className="text-xs font-semibold uppercase">Username</label>
                            <input type="text" className="auth-input"  placeholder="Enter Username"/>
                        </div>
                        <div className="flex flex-col gap-1 mt-4">
                            <label className="text-xs font-semibold uppercase">Password</label>
                            <input type="text" className="auth-input"  placeholder="Enter password"/>
                        </div>
                       
                        <button className="auth-btn mt-8">Signin</button>
                        <p className="text-sm text-center mt-4"> Don't have account signin</p>
                    </div>
                    <div className="border [flex:2]">
                        imag
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;