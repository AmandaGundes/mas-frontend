import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Container, Content, Background, FormContainer, InputContainer, Error } from "./styles";
import { useAuth } from "../../hooks/Auth";

interface FormData {
  email: string;
  password: string;
}

export function Login() {

  const { signIn } = useAuth();

  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = handleSubmit(async data => await signIn({
    email: data.email,
    password: data.password
  }).then(() => history.push('/dashboard'))
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <h2>Faça seu Login</h2>
          <form onSubmit={onSubmit}>
            <InputContainer>
              <FiMail size={20} />
              <input
                type="email"
                placeholder="E-mail"
                {...register("email", { required: true })}
              />
            </InputContainer>
            {errors.email && <Error>O preenchimento do campo é obrigatório</Error>}
            <InputContainer>
              <FiLock size={20} />
              <input
                type="password"
                placeholder="Senha"
                {...register("password", { required: true })}
              />
            </InputContainer>
            {errors.password && <Error>O preenchimento do campo é obrigatório</Error>}
            <Button type="submit">Entrar</Button>
          </form>
          <Link to="/register">
            <FiLogIn size={20} />
            Cadastre sua conta
          </Link>
        </FormContainer>
      </Content>
      <Background />
    </Container>
  )
}