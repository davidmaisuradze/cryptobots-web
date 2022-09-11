import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label, TextInput } from 'flowbite-react';
import { PATTERN_CONFIG } from '../../config';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../state/actions';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

const formSchema = Yup.object().shape({
  email: Yup.string().matches(PATTERN_CONFIG.email.pattern, { message: 'Wrong email format' }),
  password: Yup.string().required("Password is required"),
});

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, 'data');
    dispatch(loginAction(data));
  };

  return (
    <div className="mt-12 w-1/2 sm:w-2/5 m-auto h-screen">
      <h1 className="mb-4 text-2xl font-medium leading-6 text-gray-900">Register</h1>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                {...register('email')}
                placeholder="test@test.com"
              />
              {errors.email && <div className="text-red-400">{errors.email.message}</div>}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Password</Label>
              </div>
              <TextInput
                id="password"
                type="password"
                {...register('password')}
              />
              {errors.password && <div className="text-red-400">{errors.password.message}</div>}
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
