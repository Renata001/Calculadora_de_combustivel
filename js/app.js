var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: '',
    // App id
    id: 'gmail.com@marciolourens',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [{
            path: '/home/',
            url: 'index.html?n=x',
        },


    ],
});

var mainView = app.views.create('.view-main');
var $$ = Dom7;

$(document).ready(function() {
        
    $('.btn-novo,.dinheiro,.litro,#dinheiro,#litros,#novo-calculo').hide();
    $('#btn-calcular').click(function() {
        etanol = $('#etanol').val();
        gasolina = $('#gasolina').val();
        resultado = 0;
        men = "";



        if (etanol == "" || gasolina == "") {
            app.dialog.alert('Informe preço do Etanol e da Gasolina ', 'AVISO');
            $('#etanol,#gasolina').val("");
            return false;
           
        }
        etanol = parseFloat(etanol);
        gasolina = parseFloat(gasolina);


        porcentagem = etanol / gasolina;
        porcentagem = porcentagem.toFixed(2);

        if (porcentagem > 0.7) {
            resultado = "Gasolina";
            men = "O Etanol custa " + (porcentagem * 100).toFixed(0) + "% ";
        } else {
            resultado = "Etanol";
            men = "O Gasolina custa " + (porcentagem * 100).toFixed(0) + "%";

        }
        app.dialog.alert("Abasteça hoje com: <br>" + resultado);
        $('.mensagem').html(resultado);
        $('.porc').html(men + "comparado a " + resultado);

        $('#dinheiro,#litros').attr('disabled', false);

        $('.btn-novo,.dinheiro,.litro,#dinheiro,#litros,#novo-calculo').show();

    }); //Fim do BTN-CALCULAR
  
    $('.btn-novo').click(function() {
        $('#etanol, #gasolina,#dinheiro,#litros').val("");
        $('.mensagem, .porc').html("");
        $('#btn-calcular,#etanol,#gasolina').attr('disabled', false);
        $('.btn-novo,.dinheiro,.litro,#dinheiro,#litros,#novo-calculo').hide();
        desabilitar();
    });

    desabilitar();
    //iniciando a função Dinheiro
    $('#dinheiro').on('input', function() {
        $('.btn-novo').attr('disabled', false);

        $('#btn-calcular,#etanol,#gasolina').attr('disabled', true);
        dinheiro = $('#dinheiro').val();



        //vereficando se está digitando o dinheiro
        if (dinheiro > 0) {
            $('#litros').attr('disabled', true); //attr= atributo
            dinheiro = parseFloat(dinheiro);

            if (resultado == "Gasolina") {
                litros = dinheiro / gasolina;
            } else {
                litros = dinheiro / etanol;
            }

            $('.litros-visible').show(); //aparecendo 
            $('#lb_litros').html(litros.toFixed(2).replace('.', ',')); //toFixed() = casas decimais
            $('.result').html(resultado);
            $('.consumo').show();

        } else {
            $('#litros').attr('disabled', false);
            $('.litros-visible').hide();
            $('.consumo').hide();

        }
    }); //Fim do input dinheiro

    //Inciando a função litros
    $('#litros').on('input', function() {
        $('.btn-novo').attr('disabled', false);
        $('#btn-calcular,#etanol,#gasolina').attr('disabled', true);

        litros = $('#litros').val();
        if (litros > 0) {
            $('#dinheiro').attr('disabled', true);
            litros = parseFloat(litros);

            if (resultado == "Gasolina") {
                dinheiro = litros * gasolina;
            } else {
                dinheiro = litros * etanol;
            }
            $('.dinheiro-visible').show();
            $('#lb_dinheiro').html(dinheiro.toFixed(2).replace('.', ',') + ' de ' + resultado);

        } else {
            $('#dinheiro').attr('disabled', false);
            $('.dinheiro-visible').hide();
        }

    });

    $('.consumo').hide();

}); //Fim do documento


function desabilitar() {

    //Desabilitar segunda parte
    $('.btn-novo,#dinheiro,#litros').attr('disabled', true);
    $('.litros-visible,.dinheiro-visible').hide();
}