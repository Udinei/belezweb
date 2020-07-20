﻿import styled from "styled-components";

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto 0px;

    display: flex;
    flex-direction: column;

    header {
        display: flex;
        align-self: center;
        align-items: center;

        button {
            border: 0;
            background: none;
        }

        strong{
            color: #fff;
            font-size: 24px;
            margin: 0 15px;
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);/** cria 2 colunas de mesmo tamanho */
        grid-gap: 15px; /** cada coluna com 15p´x */
        margin-top: 30px;
        margin-bottom: 30px;

    }
`;

export const Time = styled.li`
    padding: 20px;
    border-radius: 4px;
    background: #fff;

    opacity: ${props => (props.past ? 0.6 : 1)}; /** se tem propriedade past no time escurece o time */

    strong {
        display: block;
        color: ${props => (props.available ? '#999' : '#7159c1')};
        font-size: 20px;
        font-weight: normal;
    }

    span {
        display: block;
        margin-top: 3px;
        color: ${props => (props.available ? '#999' : '#666')};
    }
`;