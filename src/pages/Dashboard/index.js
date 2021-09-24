import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Container } from './styles';

const Dashboard = ({
  authenticated,
  setCurrentUserEmail,
  currentUserEmail,
}) => {
  const [apiResponse, setApiResponse] = useState(false);
  const [userTech, setUserTech] = useState();

  useEffect(() => {
    console.log(localStorage.getItem('@KenzieHub:id'));
    api
      .get(`/users/${localStorage.getItem('@KenzieHub:id')}`)
      .then((response) => {
        setUserTech(response.techs);
        setApiResponse(true);
        console.log(currentUserEmail);
      });
  }, []);
  // if (apiResponse) {
  //   setUser(usersArray.find((obj) => obj.email === currentUserEmail));
  //   setUserTech(user.techs);
  // }
  // console.log(user);
  // const filtered = (users) => {
  //   if (users.email === currentUserEmail) {
  //     return users;
  //   }
  // };

  // const currentUser = usersArray.filter(filtered);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const handleTech = (data) => {
    api
      .post('/users/techs', data)
      .then((response) => toast.success('Tecnologia adicionada com sucesso!'))
      .catch((err) => toast.error('Erro ao adicionar, tente novamente!'));
  };

  const deleteTech = (id) => {
    api
      .delete(`/users/techs/${id}`)
      .then((response) => toast.success('Tecnologia deletada com sucesso!'))
      .catch((err) => toast.error('Erro ao deletar, tente novamente!'));
  };
  console.log(authenticated);

  // if (!authenticated) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <Container>
      <h2>Dashboard</h2>
      <div>
        <form onSubmit={handleSubmit(handleTech)}>
          <input {...register('title')} placeholder="Add Tecnologia" />
          <input {...register('status')} placeholder="Status" />
          <button type="submit">Adicionar</button>
        </form>
      </div>
      <div>
        {apiResponse &&
          userTech.map((obj, index) => (
            <div key={index}>
              <p>Título da tech: {obj.title}</p>
              <p>Status: {obj.status}</p>
              <button onClick={() => deleteTech(obj.id)}>Deletar tech</button>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Dashboard;
