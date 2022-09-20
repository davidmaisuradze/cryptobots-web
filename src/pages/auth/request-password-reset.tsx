import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATTERN_CONFIG } from '../../config';
import { useDispatch } from 'react-redux';
import { requestPasswordResetAction } from '../../state/actions';
import { Input, AuthLayout, AUTH_TYPES, ButtonSubmit, ButtonGoBack } from '../../components/UI';

type Inputs = {
  email: string;
};

const formSchema = Yup.object().shape({
  email: Yup.string().matches(PATTERN_CONFIG.email.pattern, { message: 'Wrong email format' }),
});

const RequestPasswordReset: NextPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, 'data');
    dispatch(requestPasswordResetAction(data));
  };

  return (
    <AuthLayout action={AUTH_TYPES.REQUEST_PASSWORD_RESET}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" name="email" label="Email" errors={errors.email} register={register} />

        <div className="text-center flex justify-between lg:text-left">
          <ButtonGoBack />
          <ButtonSubmit title="Reset password" />
        </div>
      </form>
    </AuthLayout>
  );
};

export default RequestPasswordReset;
