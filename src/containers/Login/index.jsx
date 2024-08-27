import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify"

import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from "./styles";
import Logo from "../../assets/Logo.svg";
import { Button } from '../../components/Button';
import { api } from "../../services/api";


export function Login() {
    const navigate = useNavigate();
    const schema = yup
        .object({
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
        })
        .required();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const response = await toast.promise(
            api.post("/session", {
                email: data.email,
                password: data.password
            }),
            {
                pending: 'Verificando seus dados',
                success: {
                    render() {
                        setTimeout(() => {
                            navigate('/')
                        }, 2000);
                        return 'Seja Bem-Vindo(a)👊'
                    }
                },
                error: 'Email ou Senha incorretos🤯',
            },
        );

        console.log(response);
    };

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburger" />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burger!</span>
                    <br />
                    Acesse com seu <span> Login e Senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Password</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <Button type="submit">Entra</Button>
                </Form >
                <p>Não possui conta? <Link to="/cadastro">Clique aqui.</Link></p>
            </RightContainer>
        </Container>
    );
};