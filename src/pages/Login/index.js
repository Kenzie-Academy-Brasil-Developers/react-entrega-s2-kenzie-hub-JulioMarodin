import { BrowserRouter as Link, useHistory, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Container } from './styles';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = ({
  authenticated,
  setAuthenticated,
  currentUserEmail,
  setCurrentUserEmail,
}) => {
  const schema = yup.object().shape({
    email: yup.string().email('Email inválido.').required('Campo obrigatório'),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        'Senha precisa conter pelo menos uma letra minúscula, uma maiúscula, um número e pelo menos 8 caracteres.'
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const handleLogin = (data) => {
    // data.preventDefault();
    console.log(data);
    api
      .post('/sessions', data)
      .then((response) => {
        console.log(response.data.user.id);
        const { token } = response.data;
        localStorage.setItem('@KenzieHub:token', JSON.stringify(token));
        localStorage.setItem('@KenzieHub:id', response.data.user.id);
        setAuthenticated(true);
        return history.push('/dashboard');
      })
      .catch((err) => toast.error('Email ou senha inválidos!'));
  };
  console.log(currentUserEmail);

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <h2>Login</h2>
          <input {...register('email')} placeholder="Email" />
          <input
            {...register('password')}
            type="password"
            placeholder="Senha"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Ainda não tem uma conta? Faça seu <Link to="/cadastro">cadastro</Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
