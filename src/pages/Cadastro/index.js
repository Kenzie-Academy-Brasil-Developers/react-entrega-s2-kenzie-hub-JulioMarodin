import { useForm } from 'react-hook-form';
import { Link, useHistory, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from './styles';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Cadastro = ({ authenticated }) => {
  const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório.'),
    bio: yup.string().required('Campo obrigatório.'),
    contact: yup.string().required('Campo obrigatório.'),
    course_module: yup.string().required('Campo obrigatório.'),
    email: yup.string().email('Email inválido.').required('Campo obrigatório'),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        'Senha precisa conter pelo menos uma letra minúscula, uma maiúscula, um número e pelo menos 8 caracteres.'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas diferentes')
      .required('Campo obrigatório.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const submitForm = ({
    name,
    bio,
    contact,
    course_module,
    email,
    password,
  }) => {
    // console.log(data);
    const user = { name, bio, contact, course_module, email, password };
    api
      .post('/users', user)
      .then((response) => {
        toast.success('Conta criada com sucesso!');
        return history.push('/login');
      })
      .catch((err) => toast.error('Erro ao criar a conta, tente outro email!'));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <h2>Cadastro</h2>
          {errors?.name?.message}
          <input placeholder="Nome" {...register('name')} />
          {errors?.bio?.message}
          <input placeholder="Bio" {...register('bio')} />
          {errors?.contact?.message}
          <input placeholder="LinkedIn" {...register('contact')} />
          {errors?.course_module?.message}
          <input placeholder="Módulo do curso" {...register('course_module')} />
          {errors?.email?.message}
          <input placeholder="Email" {...register('email')} />
          {errors?.password?.message}
          <input
            placeholder="Senha"
            type="password"
            {...register('password')}
          />
          {errors?.confirmPassword?.message}
          <input
            placeholder="Confirmar senha"
            type="password"
            {...register('confirmPassword')}
          />
          <div>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
        <p>
          Já tem uma conta? Faça seu <Link to="/login">login</Link>
        </p>
      </div>
    </Container>
  );
};

export default Cadastro;
