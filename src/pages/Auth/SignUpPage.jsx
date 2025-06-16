import React, { useState } from 'react';
import { Users, Award, Target, Zap } from 'lucide-react';
import { AuthLayout, Logo } from '../../layouts/AuthLayout';
import { FormInput } from '../../components/CustomElements/FormInput';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        agreeToTerms: false,
        showPassword: false,
        showConfirmPassword: false
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
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Add your signup logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            console.log('Signup attempt:', formData);
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const heroContent = (
        <div className="text-white space-y-6 max-w-xl text-center">
            <h2 className="text-4xl font-bold">Start Your Learning Journey</h2>
            <p className="text-xl opacity-90">Join thousands of learners and instructors in our community</p>

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Users className="w-6 h-6" />
                    </div>
                    <span>Join active community</span>
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
                    <span>Achieve your goals</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Zap className="w-6 h-6" />
                    </div>
                    <span>Learn at your pace</span>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout heroContent={heroContent} isReversed>
            <Logo variant="green" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create an Account</h1>
            <p className="text-gray-600 mb-6">Join our learning platform today</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="First Name"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        placeholder="Enter your first name"
                        required
                    />

                    <FormInput
                        label="Last Name"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        placeholder="Enter your last name"
                        required
                    />
                </div>

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
                    placeholder="Create a password"
                    required
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    showPassword={formData.showConfirmPassword}
                    togglePassword={() => setFormData(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                    placeholder="Confirm your password"
                    required
                />

                <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">I am a:</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={formData.role === 'student'}
                                    onChange={handleChange}
                                    className="form-radio text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-gray-700">Student</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="instructor"
                                    checked={formData.role === 'instructor'}
                                    onChange={handleChange}
                                    className="form-radio text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-gray-700">Instructor</span>
                            </label>
                        </div>
                    </div>

                    <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="form-checkbox mt-1 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-600">
                            I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-700">Terms of Service</a> and{' '}
                            <a href="#" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</a>
                        </span>
                    </label>
                    {errors.agreeToTerms && (
                        <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                    hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                    focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default SignUpPage;