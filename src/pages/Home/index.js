import { useHistory } from 'react-router';
import { Redirect } from 'react-router';
import { Container } from './styles';

const Home = ({ authenticated }) => {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <h3>Bem vindo ao KenzieHub</h3>
      <span>Portfólio para alunos Kenzie</span>
      <div>
        <button onClick={() => handleNavigation('/cadastro')}>
          Cadastre-se
        </button>
        <button onClick={() => handleNavigation('/login')}>Login</button>
      </div>
    </Container>
  );
};

export default Home;
