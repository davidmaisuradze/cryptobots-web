import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label, TextInput } from 'flowbite-react';
import { PATTERN_CONFIG } from '../../config';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../state/actions';
import { Input } from '../../components/UI';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

const formSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().matches(PATTERN_CONFIG.email.pattern, { message: 'Wrong email format' }),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .matches(PATTERN_CONFIG.password.pattern, { message: 'Min. 8 characters, both upper and lower case letters, at least one number and special character' }),
  confirmedPassword: Yup.string()
    .required('Confirm Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
});

const Register: NextPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, 'data');
    dispatch(registerAction(data));
  };

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Register</p>
              </div>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" />

              <Input type="text" name="firstName" label="First name" errors={errors.firstName} register={register} />
              <Input type="text" name="lastName" label="Last name" errors={errors.lastName} register={register} />
              <Input type="email" name="email" label="Email" errors={errors.email} register={register} />
              <Input type="password" name="password" label="Password" errors={errors.password} register={register} />
              <Input type="password" name="confirmedPassword" label="Confirm password" errors={errors.confirmedPassword} register={register} />

              <div className="text-center flex justify-between lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Register
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Have an account?
                  <a
                    href="/auth/login"
                    className="ml-2 text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
