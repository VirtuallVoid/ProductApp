$(document).ready(function () {
    console.log("ready!");
    fillTblData();

    //Function For delete Button
    $('#delete').click(function () {
        let productIDArray = new Array();
        $('.myBox:checked').each(function() {
            let elem = $(this).parent().parent();
            let item = JSON.parse($(elem).find("td:nth-child(1)").text());
            productIDArray.push(item.productID);
        });

        if (productIDArray.length > 0) {
            if (confirm('გსურთ მონაცემების წაშლა?')) {
                $.ajax({
                    url: '/ProductDelete/DeleteProduct',
                    type: 'POST',
                    data: JSON.stringify(productIDArray),
                    contentType: 'application/json; charset=utf-8',
                    success: function(response) {
                        console.log(response);
                        fillTblData();

                        $('#alertMessage').addClass('alert-success').text('წარმატებით ამოიშალა ბაზიდან');
                        setTimeout(function () {
                            $('#alertMessage').removeClass('alert-success').text('');
                        }, 3000);
                    }
                });
            }
        }
    });

    //Functions For Validation
    function validateProductName(productName) {
        let len = productName.length;
        if (len === 0 || len > 30)
            return false;
        return true;
    }

    function validateDescription(desc) {
        let len = desc.length;
        if (len === 0 || len > 50)
            return false;
        return true;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }

    function validateForm(productName, description, price, statusid) {
        let isProductName = validateProductName(productName);
        let isDescription = validateDescription(description);
        let isPrice = isNumber(price);
        let isStatus = (statusid !== '1');

        //update messages
        if (!isProductName)
            $('#productNameMessages').text('გთხოვთ შეიყვანოთ პროდუქტის სახელი');
        else
            $('#productNameMessages').text('');

        if (!isDescription)
            $('#descriptionMessages').text('გთხოვთ შეავსოთ აღწერის ველი');
        else
            $('#descriptionMessages').text('');

        if (!isPrice)
            $('#priceMessages').text('გთხოვთ შეიყვანეთ ფასი');
        else
            $('#priceMessages').text('');

        if (!isStatus)
            $('#statusMessages').text('გთხოვთ აირჩიოთ სტატუსი');
        else
            $('#statusMessages').text('');


        return isProductName && isDescription && isPrice && isStatus;
    }

    //Submit From Form To Database
    $('#save_form').submit(e => {
        e.preventDefault();
        let productID = $('#productID').val().trim();
        let productName = $('#productName').val().trim();
        let description = $('#description').val().trim();
        let price = $('#price').val().trim();
        let currencyID = $('#Currency').val();
        let statusID = $('#Status').val();

        if (validateForm(productName, description, price, statusID)) {
            let url;

            if (productID === '' || productID === null)
                url = '/ProductAdd/SaveProduct';
            else
                url = '/ProductUpdate/UpdateProduct';

            const postData = {
                productID: productID,
                productName: productName,
                description: description,
                price: parseFloat(price).toFixed(2),
                currencyID: parseInt(currencyID),
                statusID: parseInt(statusID)
            };

            $.post(url, postData, (response) => {
                console.log(response);
                resetForm();
                fillTblData();
                let txt = (productID === '' || productID === null)
                    ? 'წარმატებით დაემატა პროდუქტი ბაზაში'
                    : 'წარმატებით შეიცვალა ინფორმაცია';

                    $('#alertMessage').addClass('alert-success').text(txt);
                    setTimeout(function() {
                            $('#alertMessage').removeClass('alert-success').text('');
                    }, 3000);
            });
        }
    });

    //Function For Clear Button
    function resetForm() {
        $('#productID').val(null);
        $('#productName').val('');
        $('#description').val('');
        $('#price').val('');
        $('#Currency').val('1');
        $('#Status').val('1');
    }
    $('#clear').click(function () {
        resetForm();
    });

    //Method To Appear Table Data On Registration Form To Edit
    $(document).on("click", "#productTbl tbody tr", function () {

        let element = $(this);
        let item = JSON.parse($(element).find("td:nth-child(1)").text());
        $('#productID').val(item.productID);
        $('#productName').val(item.productName);
        $('#description').val(item.description);
        $('#price').val(item.price);
        $('#Currency').val(item.currencyID.toString());
        $('#Status').val(item.statusID.toString());


        $('#form_title').replaceWith(function () {
            return `<div class="py-3 bg-dark text-light text-center rounded" id="form_title">
                        შეცვალეთ ინფორმაცია
                    </div >`;
        });


    });

    //Function To Fill Data Of Table 
    function fillTblData() {
        $.get('/Home/GetTblData', function (data) {
            let template = ``;
            data.forEach((item) => {

                template += '<tr>';
                template += `<td hidden> ${JSON.stringify(item)} </td>`;
                template += `<td class="text-center"> <input type="checkbox" class="myBox"> </td>`;
                template += `<td> ${item.productName} </td>`;
                template += `<td> ${item.description} </td>`;
                template += `<td> ${item.status} </td>`;
                template += `<td> ${item.price} ${item.currency} </td>`;
                template += `</tr>`;

            });
            $("#productTbl tbody").html(template);

        });
    }
});