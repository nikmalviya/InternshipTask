rowCount = 1

function calculateAmount(input){
    id = input.id.slice(input.id.indexOf("-")+1)
    var qty = document.getElementById("qty-"+id).value;
    var rate = document.getElementById("rate-"+id).value;
    if(!isNaN(qty) && !isNaN(rate) && qty !="" && rate!=""){
        var amt = parseInt(qty)*parseFloat(rate)
        document.getElementById("amt-"+id).value = amt;
        calculateSubTotal();       
    }
}
function calculateSubTotal(){
    amts = document.getElementsByClassName("amt")
    var subtotal=0;
    var i;
    for ( i=0;i<amts.length; i++){        
        if(!isNaN(amts[i].value) && amts[i].value!=""){
            subtotal+=parseFloat(amts[i].value);
        }
    }
    document.getElementById("subtotal").value= subtotal;
    document.getElementById("total").value = subtotal;
}

function calculateDiscount(){
    subtotal = document.getElementById("subtotal");
    total = document.getElementById("total");
    discount = document.getElementById("discount").value;
    if (!isNaN(discount) && discount!=""){        
        total.value = parseFloat(subtotal.value) - parseFloat(subtotal.value)*parseFloat(discount)/100
    }

}
function calculateTax(){
    subtotal = document.getElementById("subtotal");
    total = document.getElementById("total");
    tax = document.getElementById("tax").value;
    if (!isNaN(tax) && tax!=""){        
        total.value = parseFloat(subtotal.value) + parseFloat(subtotal.value)*parseFloat(tax)/100
    }

}

function removeRow(btn){
    id = btn.id.slice(btn.id.indexOf('-')+1)
    table = document.getElementById("table")
    subtotal = document.getElementById("subtotal")
    amt = document.getElementById("amt-"+id)
    subtotal.value = parseFloat(subtotal.value) - parseFloat(amt.value);
    table.removeChild(document.getElementById("row-"+id))
    srnos = document.getElementsByClassName("srno");
    var count = 0;
    for(i=0;i<srnos.length;i++){
        count++;
        srnos[i].innerHTML=count+".";
    }
    
}



function addRow(btn){
    btn.style.visibility = "hidden"
    var table = document.getElementById("table");
    var row = document.createElement("div");
    row.className = "row";
    rowCount++;
    row.id = "row-"+rowCount;
    rowNode = document.getElementById("row-"+btn.id.slice(btn.id.indexOf('-')+1))    
    removebtn = rowNode.children[1].innerHTML = '<button id="rbtn-'+(rowCount-1)+'" type="button" onclick="removeRow(this)" class="btn btn-danger " style="margin-top:30px;border-radius:45%;"><i class="fa fa-minus"></i></button>';
    srno  = srnos = document.getElementsByClassName("srno").length+1;


    row.innerHTML = '<label class="col-1 srno" style="margin-top:35px;font-size:16px;text-align:right">'+srno+'.</label>\
    <div id="rbtn-div" class="form-group col-1">\
    </div>\
	<div class="form-group col-2">\
		<label for="name">Name</label>\
		<input type="text" class="form-control" id="name-'+rowCount+'">\
	</div>\
	<div class="form-group col-1">\
			<label for="name">Quantity</label>\
			<input onkeyup="calculateAmount(this)" type="text" class="form-control" id="qty-'+rowCount+'">\
	</div>\
	<div class="form-group col-2">\
			<label for="name">Rate</label>\
			<input onkeyup="calculateAmount(this)" type="text" class="form-control" id="rate-'+rowCount+'">\
	</div>\
	<div class="form-group col-2">\
			<label for="name">Amount</label>\
			<input type="text" class="form-control amt" id="amt-'+rowCount+'">\
	</div>\
	<div class="form-group col-1">\
		<button id="btn-'+rowCount+'" type="button" onclick="addRow(this)" class="btn btn-success" style="margin-top:30px;border-radius:45%"><i class="fa fa-plus"></i></button>\
    </div>'
    table.appendChild(row)
}