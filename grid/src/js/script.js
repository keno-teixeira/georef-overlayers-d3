$(document).ready(function() {
    var data = window.location.href.toString();
    var arrUrl = data.split('/?');

    var url = "http://www.morarbem.df.gov.br/consultas/geocity?" + arrUrl[1]

    $('#detais').DataTable( {
        "ajax": {
            "url": url,
            "dataSrc": "data"
        },
        "columns": [
            { "data": "CityName"},            
            { "data": "Name"},
            // { "data": "Cpf"},
            { "data": "Pontuacao"},
            { "data": "SpecialCondition"},
            { "data": "Zone"},
            { "data": "GenderName"},
            { "data": "Old"},
            { "data": "DepE"},
            { "data": "DepN"},
            { "data": "Type"}
        ],
        "language": {
            "lengthMenu": "registros de exibicao _MENU_ por pagina",
            "search": "Pesquisar",
            "zeroRecords": "Nada foi encontrado - desculpe",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "Não ha registros disponiveis",
            "infoFiltered": "(filtrado do _MAX_ total de registros)",
            "paginate": {
                "first":      "Primeiro",
                "last":       "Ultimo",
                "next":       "Proximo",
                "previous":   "Anterior"
            }
        },
        dom: 
            "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>"+
            "<'row'<'col-sm-10'><'col-sm-010'>>"//<'btn-right'B>>" 
        ,
        // buttons: [
        //     {
        //         extend: 'excel',
        //         text: 'Exportar excel'
        //         //,
        //         // exportOptions: {
        //         //     modifier: {
        //         //         page: 'current'
        //         //     }
        //         // }
        //     }
        // ]
    })
})