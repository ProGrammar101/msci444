$(document).ready(function() {
    $.ajax({
        url: '../php/get_myTickets.php',
        type: 'get',
        success: function(data) {
	    //put the tickets dynamically in the table using foreach
	    var tickets = JSON.parse(data);
            var dataTable = $('#dataTables-example tbody');
            for(var index = 0; index < tickets.length; index++) {
		var ticket = tickets[index];
		ticket["first_name"] += " " + ticket["last_name"];
		delete ticket["last_name"];
                var tr = "<tr " + (index % 2 == 0 ? 'class="odd">' : 'class="even">');
                for (var key in ticket) {
                    if (ticket.hasOwnProperty(key)) {
                        tr += "<td>" + ticket[key] + "</td>";
                    }
                }
                dataTable.append(tr + "</tr>");
            }
            $('#dataTables-example').DataTable({
      	      responsive: true
    	    }); 
        },
        error: function(error) {
            console.log(error);
            $('.alert').text(error.responseText).show();
        }
    });
});
