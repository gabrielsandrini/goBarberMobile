import React from 'react';
import { Text } from 'react-native';

import BackGround from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function SignIn() {
  return (
    <BackGround>
      <Text>Sign In</Text>
      <Input
        icon="call"
        placeholder="Digite seu nome"
        style={{ marginTop: 30 }}
      />
      <Button>Entrar</Button>
    </BackGround>
  );
}
