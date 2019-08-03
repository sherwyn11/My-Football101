var selectedYear;
$('#demolist li').on('click', function(){
    $('#datebox').val($(this).text());
    selectedYear = $(this).text();
    selectedYear = selectedYear.slice(0, -5);
    console.log(selectedYear);
});

$('#submitBtn').on('click', function(event){
    if(selectedYear != null){
        axios.post('/set-year', {
            year: selectedYear
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
});

$.get('/get-favourite').done((response) => { 
    let favouriteTeam = response.favouriteTeam;
    let index;
    let table = $("table tbody");
    let tableChildren = table.children();
    console.log();
    tableChildren.each( (i, el) => {
        let cells = el.cells;
        if(cells.item(1).innerHTML == favouriteTeam){
            el.style.color="lightgreen";
        }
    });
    
});