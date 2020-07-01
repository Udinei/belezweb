import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';
import * as Yup from 'yup'; // validação de campos e msg
import { signUpRequest } from '~/store/modules/auth/actions';

/** esquema da validação de campos , uso de shape para usar objetos */
const schema = Yup.object().shape({
    name: Yup.string()
           .required('O nome é obrigatório'),
    email: Yup.string()
            .email('Insira um e-mail válido')
            .required('O e-mail é obrigatório'),
    password: Yup.string()
              .min(6, 'No minimo 6 caracteres')
              .required('A senha é obrigatória'),

});


export default function SignUp() {
    const dispatch = useDispatch();


    function handleSubmit({name, email, password})  {
        // dispara action signUpRequest enviando parametros
       dispatch(signUpRequest(name, email, password));
    }

    return (
        <>
            <img src={ logo } alt="BelezWeb" />

            <Form schema={schema} onSubmit={ handleSubmit }>
                <Input name="name" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua senha secreta" />

                <button type="submit">Criar conta</button>

                <Link to="/">Já tenho login</Link>
            </Form>
        </>
    )
}


