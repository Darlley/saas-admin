import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = () => {
  const token = uuidv4();
  // Aqui você pode adicionar lógica adicional, como salvar o token no banco de dados
  return token;
}
