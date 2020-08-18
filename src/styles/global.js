import { createGlobalStyle } from 'styled-components';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css'; // importando lib de msg


export default createGlobalStyle`
    /**  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');*/
         @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }


    /** remove a seleção azul ao redor dos campos ao focar  */
    *:focus {
        outline: 0;
    }

     html, body, #root {
         /** ocupa 100% da tela vh*/
         /**  height: 100%; */
        min-height: 100%;

     }

     body {
         -webkit-font-smoothing: antialiased; /** suaviza quinas das fontes */
     }

     body, input, button {
         font: 14px 'Roboto', san-serif; /** tamanho e fontes do body, input e button */
     }

    a {
        text-decoration: none; /** remve sublinhado dos links */
    }

    ul {
        list-style: none; /** */
    }

    button {
        cursor: pointer; /** maozinha ao selecionar cursor */
    }


`;
