import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATTERN_CONFIG } from '../../config';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../state/actions';
import { Input, AuthLayout, AUTH_TYPES, ButtonSubmit } from '../../components/UI';

type Inputs = {
  email: string;
  password: string;
};

const formSchema = Yup.object().shape({
  email: Yup.string().matches(PATTERN_CONFIG.email.pattern, { message: 'Wrong email format' }),
  password: Yup.string().required('Password is required'),
});

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, 'data');
    dispatch(loginAction(data));
  };

  return (
    <AuthLayout action={AUTH_TYPES.LOGIN} showAlternativeOptions={true}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" name="email" label="Email" errors={errors.email} register={register} />
        <Input type="password" name="password" label="Password" errors={errors.password} register={register} />

        <div className="flex justify-between items-center mb-6">
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="exampleCheck2"
            />
            <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
          </div>
          <a href="#!" className="text-gray-800">Forgot password?</a>
        </div>

        <div className="text-center flex justify-between lg:text-left">
          <ButtonSubmit title="Login" />
          <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Don<span>&apos;</span>t have an account?
            <a
              href="/auth/register"
              className="ml-2 text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
