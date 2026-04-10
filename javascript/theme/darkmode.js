function detectarTemaSistema() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function aplicar(tema) {
    document.body.setAttribute('data-theme', tema);
}

export function init_darkmode() {
    const boton = document.getElementById("themeButton");
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const memoria = localStorage.getItem("theme");

    if (memoria) {
        aplicar(memoria);
    } else {
        aplicar(detectarTemaSistema());
    }

    if (boton) {
        boton.addEventListener('click', () => {
            const temaSistema = detectarTemaSistema();
            const temaActual = document.body.getAttribute('data-theme');

            if (temaActual === temaSistema) {
                const opuesto = temaActual === 'dark' ? 'light' : 'dark';
                aplicar(opuesto);
                localStorage.setItem("theme", opuesto);
            } else {
                aplicar(temaSistema);
                localStorage.removeItem("theme");
            }
        });
    }

    mq.addEventListener('change', (e) => {
        if (!localStorage.getItem("theme")) {
            aplicar(e.matches ? 'dark' : 'light');
        }
    });
}