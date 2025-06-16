import React, { useState } from 'react';
import { Users, Award, Target, Zap } from 'lucide-react';
import { AuthLayout, Logo } from '../../layouts/AuthLayout';
import { FormInput } from '../../components/CustomElements/FormInput';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Add your login logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            console.log('Login attempt:', formData);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const heroContent = (
        <div className="text-white space-y-6 max-w-xl text-center">
            <h2 className="text-4xl font-bold">Welcome Back!</h2>
            <p className="text-xl opacity-90">Continue your learning journey with us</p>

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Users className="w-6 h-6" />
                    </div>
                    <span>Active community</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Award className="w-6 h-6" />
                    </div>
                    <span>Expert instructors</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Target className="w-6 h-6" />
                    </div>
                    <span>Personalized goals</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Zap className="w-6 h-6" />
                    </div>
                    <span>Quick progress</span>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout heroContent={heroContent}>
            <Logo variant="blue" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back!</h1>
            <p className="text-gray-600 mb-6">Sign in to continue your learning journey</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                    label="Email Address"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Enter your email"
                    required
                />

                <FormInput
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    showPassword={formData.showPassword}
                    togglePassword={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                    placeholder="Enter your password"
                    required
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="form-checkbox text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium 
                        hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                        transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <Link to="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;