import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Container } from './styles';

const Dashboard = ({ authenticated }) => {
  const [userTech, setUserTech] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem('@KenzieHub:token')) || ''
  );
  const [userID] = useState(JSON.parse(localStorage.getItem('@KenzieHub:id')));

  const { register, handleSubmit } = useForm();

  const getTechs = () => {
    api
      .get(`/users/${userID}`)
      .then((response) => {
        setUserTech(response.data.techs);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTechs();
  }, []);

  const handleTech = (data) => {
    api
      .post(
        '/users/techs',
        {
          title: data.title,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success('Tecnologia adicionada com sucesso!');
        getTechs();
      })
      .catch((err) => {
        console.log(data);
        toast.error('Erro ao adicionar, tente novamente!');
      });
  };

  const deleteTech = (id) => {
    const filteredTechs = userTech.filter((tech) => tech.id !== id);
    api
      .delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success('Tecnologia deletada com sucesso!');
        setUserTech(filteredTechs);
      })
      .catch((err) => toast.error('Erro ao deletar, tente novamente!'));
  };
  console.log(authenticated);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

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
      <div className="div__container">
        {userTech.length > 0 ? (
          userTech.map((obj, index) => (
            <div className="div__techs" key={index}>
              <p>Título da tech: {obj.title}</p>
              <p>Status: {obj.status}</p>
              <button className="button_add" onClick={() => deleteTech(obj.id)}>
                Deletar tech
              </button>
            </div>
          ))
        ) : (
          <p>
            Parece que você não tem nenhuma tecnologia adicionada, que tal
            adicionar uma agora?
          </p>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
