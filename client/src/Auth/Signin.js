import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleToggle = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <div className="auth-main flex h-screen items-center justify-center bg-background relative z-0">
            <div className="rounded-3xl py-12  gap-8 flex flex-col items-center justify-center w-3/4 bg-primary">
                <h1 className="text-3xl text-white"><b>Turbo</b>Talk</h1>
                <div className="bg-white  gap-10 rounded-lg py-12 px-10 w-2/4 flex">
                    <form onSubmit={handleSubmit} className="flex-1">

                        <p className="text-lg font-bold mb-1 text-textPrimary">Register </p>
                        <p className="text-sm text-textSecondary">Start your journey here</p>
                        <div className="flex flex-col gap-1 mt-8">
                            <label className="text-xs font-semibold uppercase text-textPrimary">Username</label>
                            <input type="text" className="auth-input" name="username" value={formData.username} onChange={handleChange} required placeholder="Enter Username" />
                        </div>
                        <div className="flex flex-col gap-1 mt-4">
                            <label className="text-xs font-semibold uppercase text-textPrimary">Password</label>
                            <div className="relative flex-1">
                                <input type={showPassword ? "text" : "password"} className="auth-input" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter password" />
                                <div className="absolute right-2 top-2 cursor-pointer" onClick={handleToggle}>
                                    {
                                        showPassword ? <Eye size={22} color={"#9d9d9d"} /> : <EyeSlash size={22} color="#9d9d9d" />
                                    }
                                </div>
                            </div>
                        </div>

                        <button className="auth-btn mt-8">Register Now</button>
                        <hr className="my-6" />
                        <p className="text-sm text-center font-semibold text-textPrimary"> Already have account ? <Link to={'/auth/login'}><span className="text-secondary">Login</span></Link> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;