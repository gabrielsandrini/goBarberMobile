import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '~/components/Background';

import {
  Container,
  Title,
  Form,
  FormInput,
  Separator,
  SubmitButton,
} from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.auth.loading);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    setPassword('');
    setOldPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        password,
        oldPassword,
        confirmPassword,
      })
    );
  }

  return (
    <Background>
      <Container>
        <Title>Meu perfil</Title>

        <Form>
          <FormInput
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            icon="person-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <FormInput
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            returnKeyType="next"
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            ref={emailRef}
          />

          <Separator />

          <FormInput
            secureTextEntry
            placeholder="Sua senha atual"
            value={oldPassword}
            onChangeText={setOldPassword}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            icon="lock-outline"
            ref={oldPasswordRef}
          />

          <FormInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            returnKeyType="next"
            placeholder="Sua nova senha"
            icon="lock-outline"
            ref={passwordRef}
          />

          <FormInput
            secureTextEntry
            placeholder="Confirmação de senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
            icon="lock-outline"
            ref={confirmPasswordRef}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Atualizar perfil
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
