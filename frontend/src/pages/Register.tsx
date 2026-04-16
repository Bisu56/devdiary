import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (error: any) {
      setError('root', { message: error.response?.data?.message || 'Registration failed' });
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
            type="text"
            {...register('name')}
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:border-cyan-500 focus:outline-none"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          
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
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 text-center text-xs text-slate-500">
          <Link to="/login" className="text-cyan-400">Already have account</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;