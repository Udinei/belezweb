import styled from "styled-components";
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto 0px;


    form {
        display: flex;
        flex-direction: column;
        margin-top: 3px;

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255,255,255, 0.7);
            }
        }

        /** msg de erros */
        span {
            color: #fb6f91;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        hr {
            border: 0;
            height: 1px;
            background: rgba(255,255,255, 0.2);
            margin: 10px 0 20px;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #3b9eff;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${ darken(0.03, '#3b9eff')}; /** altera intensidade da cor ao passar o mause sobre o botao */
            }
        }
    }

    /** > - formata somente os buttons fora do form, mas dentro do container */
    > button {
            width: 100%;
            margin: 10px 0 50px;
            height: 44px;
            background: #f64c75;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${ darken(0.08, '#f64c75')}; /** altera intensidade da cor ao passar o mouse sobre o botao */
            }
        }
`;
