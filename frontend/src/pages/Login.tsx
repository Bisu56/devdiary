import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (error: any) {
      setError('root', { message: error.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-6">
          <Link to="/" className="text-xl font-bold text-cyan-400">DevDiary</Link>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:border-cyan-500 focus:outline-none"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          
          <input
            type="password"
            {...register('password')}
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:border-cyan-500 focus:outline-none"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
          
          {errors.root && <p className="text-red-400 text-xs">{errors.root.message}</p>}
          
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 rounded-md text-sm">
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-xs text-slate-500">
          <Link to="/register" className="text-cyan-400">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;