function sendRequest(method, success) {
    $.ajax({
        url: "https://v6.exchangerate-api.com/v6/d2ca9176d7fb05b7b920d51f/" + method,
        method: "GET",
        success: success
    });
}

function getExchange(from, to) {
    sendRequest("pair/" + from + "/" + to, (data) => {
            $(".exchange-result").text($("#amount").val() + " " + $("#currency-from").val() + " = " + eval($("#amount")).val() * data.conversion_rate + " " + $("#currency-to").val())
            });
    }

window.onload = () => {
    $('.swap-button').click(() => {
        let from = $("#currency-from").val();
        let to = $("#currency-to").val();
        $("#currency-from").val(to);
        $("#currency-to").val(from);
    })

    $('.amount').focus(() => {
        $('.amount-label').addClass('focused');
    });

    $('.amount').focusout(() => {
        if($('.amount').val() == ''){
        $('.amount-label').removeClass('focused');
        }
    });
    $('.amount').keypress(function (e) { 
        if(e.key == 'e'){
            e.preventDefault();
        }
    });
            sendRequest("codes", (data) => {
                data.supported_codes.forEach(element => {
                    $("#currency-from").append("<option>" + element[0] + "</option>");
                    $("#currency-to").append("<option>" + element[0] + "</option>");
                });
            })
            $(".exchange-btn").click((e) => {
                if ($("#amount").val() == '') return;
                getExchange($("#currency-from").val(), $("#currency-to").val())
            })
}