import { Button, Center, Input, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './infra/firebase';

function SignIn() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, mail, password);
    } catch {
      alert('Usuário não encontrado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Center 
      h="100vh" 
      w="100%"
    >
      <Stack 
        border="4px solid #3f444e" 
        w="100%"
        maxW="480px"
        p="8"
        gap="4"
      >
        <Text 
          textAlign="center"
          pb="6"
          fontWeight="700"
          fontSize="22"
        >
          Sign In
        </Text>
        <Input placeholder='Email' value={mail} onChange={e => setMail(e.currentTarget.value)} />
        <Input placeholder='Password' value={password} onChange={e => setPassword(e.currentTarget.value)} />
        <Button 
          mt="12" 
          onClick={handleSignIn}
          isLoading={loading}
          disabled={loading}
        >
          Sign in
        </Button>
      </Stack>
    </Center>
  )
}

export default SignIn
