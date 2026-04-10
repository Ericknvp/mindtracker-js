import { icons } from "../components/icons.js";

function detectarTemaSistema() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function aplicar(tema, boton) {
    document.body.setAttribute('data-theme', tema);
    if (boton) {
        const nombreIcono = tema === 'dark' ? 'sol' : 'luna';
        boton.setAttribute('data-icon', nombreIcono);
        
        if (icons && icons[nombreIcono]) {
            boton.innerHTML = icons[nombreIcono];
        }
    }
}

export function init_darkmode() {
    const iniciar = () => {
        const boton = document.getElementById("themeButton");
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const memoria = localStorage.getItem("theme");
        
        const temaInicial = memoria || detectarTemaSistema();
        aplicar(temaInicial, boton);

        if (boton) {
            boton.onclick = () => {
                const temaSistema = detectarTemaSistema();
                const temaActual = document.body.getAttribute('data-theme');
                let nuevo;

                if (temaActual === temaSistema) {
                    nuevo = temaActual === 'dark' ? 'light' : 'dark';
                    aplicar(nuevo, boton);
                    localStorage.setItem("theme", nuevo);
                } else {
                    nuevo = temaSistema;
                    aplicar(nuevo, boton);
                    localStorage.removeItem("theme");
                }
            };
        }

        mq.onchange = (e) => {
            if (!localStorage.getItem("theme")) {
                aplicar(e.matches ? 'dark' : 'light', boton);
            }
        };
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
}