import { useNavigation } from '@react-navigation/native';
import { Heading, useToast, VStack } from 'native-base';
import { useState } from 'react';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { api, BaseErrorModel } from '../services/api';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const { navigate } = useNavigation();
  const toast = useToast();

  async function handleJoinPool() {
    try {
      if (code.trim()) {
        setIsLoading(true);

        await api.post('/pools/join', { code });

        navigate('pools');
      }
    } catch (error) {
      setIsLoading(false);

      const err = error as BaseErrorModel;

      if (err.response?.data?.message === 'Poll not found.') {
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      if (err.response?.data?.message === 'You already joined this poll.') {
        return toast.show({
          title: 'Você já participa desse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      toast.show({
        title: 'Não foi te adicionar nesse bolão. Tente novamente!',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através{'\n'}de seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          value={code}
          onChangeText={setCode}
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
