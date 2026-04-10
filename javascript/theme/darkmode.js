export function init_darkmode() {
    const boton = document.getElementById("themeButton");
    const cuerpo = document.body;
    const temaRecuperado = localStorage.getItem("theme");


    if (temaRecuperado !== null) {
        cuerpo.setAttribute('data-theme', temaRecuperado);
    } else {
        cuerpo.setAttribute('data-theme', 'light');
    }

    if(boton) {
        boton.addEventListener('click', function() {
            const temaActual = cuerpo.getAttribute('data-theme');

            if(temaActual === 'dark') {
                cuerpo.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                cuerpo.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        })
    }

}