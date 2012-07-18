$(function() {
        $("#flex1").flexigrid({
                url: 'get_rooms.php',
                dataType: 'json',
                colModel : [
						{display: 'links', name : 'links', width : '80', sortable : true, align: 'left'},
						{display: 'Floor', name : 'floor', width : '40', sortable : true, align: 'left'},
                        {display: 'Room Number', name : 'number', width : '120', sortable : true, align: 'left'},
                        {display: 'Name', name : 'name', width : '150', sortable : true, align: 'left'},
                        {display: 'Department', name : 'department', width : '300', sortable : true, align: 'left'}
                ],
                buttons : [
                        {name: 'Edit', bclass: 'edit', onpress : doCommand},
                        {name: 'Delete', bclass: 'delete', onpress : doCommand},
                        {separator: true}
                ],
                searchitems : [
					    {display: 'Floor', name : 'Floor'},
                        {display: 'Name', name : 'Name'},
                        {display: 'Department', name : 'Department'},
						{display: 'Room Number', name : 'Number', isdefault: true},
                        {display: 'GUID', name : 'GUID'}
                ],
                sortname: "Number",
                sortorder: "asc",
                usepager: true,
                title: "Rooms",
                useRp: true,
                rp: 10,
                showTableToggleBtn: false,
                resizable: false,
                height: "80%",
                singleSelect: true
        });
});
function doCommand(com, grid) {
	if (com == 'Edit') {
		$('.trSelected', grid).each(function() {
		var id = $(this).attr('id');
		id = id.substring(id.lastIndexOf('row')+3);
		alert("Edit row " + id);
		});
		} else if (com == 'Delete') {
		$('.trSelected', grid).each(function() {
		var id = $(this).attr('id');
		id = id.substring(id.lastIndexOf('row')+3);
		alert("Delete row " + id);
		});
	}
}
