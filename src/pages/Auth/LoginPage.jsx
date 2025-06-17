import React, { useState } from 'react';
import { AuthLayout, Logo } from '../../layouts/AuthLayout';
import { FormInput } from '../../components/CustomElements/FormInput';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, Users, Award, Target, CheckCircle, Zap } from 'lucide-react';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: 'testtest@tes.com',
        password: 'dsd@fdf',
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
        <div className="flex-1 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-16 left-16 w-24 h-24 bg-white rounded-xl transform rotate-12"></div>
                <div className="absolute top-40 right-24 w-20 h-20 bg-white rounded-xl transform -rotate-6"></div>
                <div className="absolute bottom-24 left-24 w-16 h-16 bg-white rounded-xl transform rotate-45"></div>
                <div className="absolute bottom-40 right-40 w-28 h-28 bg-white rounded-xl transform -rotate-12"></div>
                <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white rounded-xl transform rotate-45"></div>
                <div className="absolute top-1/4 right-1/4 w-18 h-18 bg-white rounded-xl transform -rotate-45"></div>
            </div>

            <div className="relative z-10 text-center text-white max-w-lg">
                {/* Animated Achievement Icons */}
                <div className="mb-8 flex justify-center space-x-6">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 animate-bounce">
                        <Zap className="w-12 h-12 text-yellow-300" />
                    </div>
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 animate-bounce delay-150">
                        <Award className="w-12 h-12 text-yellow-300" />
                    </div>
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 animate-bounce delay-300">
                        <Target className="w-12 h-12 text-yellow-300" />
                    </div>
                </div>

                <h2 className="text-4xl font-bold mb-6 leading-tight">
                    Start Your Learning
                    <span className="block text-yellow-300">Adventure Today</span>
                </h2>

                <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                    Join our community of learners and unlock your potential with
                    world-class courses, expert instructors, and hands-on projects.
                </p>

                {/* Benefits */}
                <div className="space-y-4 text-left">
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                        <span className="text-emerald-100">Access to 250+ premium courses</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                        <span className="text-emerald-100">Learn from industry experts</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                        <span className="text-emerald-100">Get certified upon completion</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                        <span className="text-emerald-100">24/7 community support</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout heroContent={heroContent}>
            <Logo variant="green" />
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
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
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