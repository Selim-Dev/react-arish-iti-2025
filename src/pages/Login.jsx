// pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object().shape({
    email: yup.string().email("Email Must Be Valid Email").required("Email is Required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is Required"),
});


const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    
    const [formError, setFormError] = useState({
        email: "",
        password: ""
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginError, setLoginError] = useState("");

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        console.log("🚀 ~ handleSubmit ~ e:", e)
        e.preventDefault();
        setFormError({ email: "", password: "" });
        setLoginError("");
        
        try {
            // Validate form
            await schema.validate(form, { abortEarly: false });
            
            // Attempt login
            setIsSubmitting(true);
            const result = await login(form.email, form.password);
            
            if (result.success) {
                // Navigate to admin dashboard
                navigate('/admin');
            } else {
                setLoginError(result.error || "Login failed");
            }
        } catch (err) {
            if (err.inner) {
                const errors = {};
                err.inner.forEach(error => {
                    errors[error.path] = error.message;
                });
                setFormError(errors);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        
        // Clear error for this field when user starts typing
        if (formError[e.target.name]) {
            setFormError({
                ...formError,
                [e.target.name]: ""
            });
        }
        
        // Clear login error when user modifies form
        if (loginError) {
            setLoginError("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to Admin Panel
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Use admin@admin.com / 12345678
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Show login error if any */}
                    {loginError && (
                        <div className="rounded-md bg-red-50 p-4">
                            <p className="text-sm text-red-800">{loginError}</p>
                        </div>
                    )}
                    
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    formError.email ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                placeholder="Email address"
                            />
                            {formError.email && (
                                <p className="mt-1 text-xs text-red-600">{formError.email}</p>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={form.password}
                                onChange={handleChange}
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    formError.password ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                placeholder="Password"
                            />
                            {formError.password && (
                                <p className="mt-1 text-xs text-red-600">{formError.password}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;