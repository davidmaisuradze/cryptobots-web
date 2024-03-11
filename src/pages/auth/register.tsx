import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATTERN_CONFIG } from '../../config';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../state/actions';
import { AuthLayout, AUTH_TYPES, ButtonSubmit, Input } from '../../components/UI';

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
    <AuthLayout action={AUTH_TYPES.REGISTER}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" name="firstName" label="First name" errors={errors.firstName} register={register} />
        <Input type="text" name="lastName" label="Last name" errors={errors.lastName} register={register} />
        <Input type="email" name="email" label="Email" errors={errors.email} register={register} />
        <Input type="password" name="password" label="Password" errors={errors.password} register={register} />
        <Input type="password" name="confirmedPassword" label="Confirm password" errors={errors.confirmedPassword} register={register} />

        <div className="text-center flex justify-between lg:text-left">
          <ButtonSubmit title="Register" />
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
    </AuthLayout>
  );
};

export default Register;
