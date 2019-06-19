var selectedYear;
$('#demolist li').on('click', function(){
    $('#datebox').val($(this).text());
    selectedYear = $(this).text();
    selectedYear = selectedYear.slice(0, -5);
    console.log(selectedYear);
});

$('#pray2God').on('click', function(event){
    if(selectedYear != null){
        axios.post('/get-year', {
            year: selectedYear
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
});