import React, { useState, useEffect } from 'react';

import { Alert } from 'react-native';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import api from '~/services/api';

import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [appointments, __setAppointments] = useState([]);

  function setAppointments(appointmentsArray) {
    const past = appointmentsArray.filter((ap) => Boolean(ap.past));
    const future = appointmentsArray.filter((ap) => !ap.past);
    const orderedList = [...future, ...past];
    __setAppointments(orderedList);
  }

  useEffect(() => {
    async function loadApppointments() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadApppointments();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, canceled_at: response.data.canceled_at }
          : appointment
      )
    );
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment
              data={item}
              onCancel={() =>
                Alert.alert(
                  'Cancelando agendamento',
                  'Você realmente deseja cancelar este agendamento ?',
                  [
                    {
                      text: 'Sim',
                      style: 'destructive',
                      onPress: () => handleCancel(item.id),
                    },
                    { text: 'Não' },
                  ],
                  { cancelable: true }
                )
              }
            />
          )}
        />
      </Container>
    </Background>
  );
}
