$(document).ready(

function () {

    var valueArray = []; // array of values
    var stateArray = []; // array of states

    var itemState = 0; // default item state = pending
    var itemID = 0; // IDs start with 0

    var done = 0; // done tasks
    var pend = 0; // pening tasks

    var stats;
    stats = function () {
        document.getElementById("pending").innerHTML = 'Pending: ' + pend;
        document.getElementById("done").innerHTML = 'Done: ' + done;
    };

    var addItem;
    addItem = function () {
        if ($('#text').val() !== "") {
            // get value from input
            var itemValue = $('#text').val();

            // add item value to the valueArray
            valueArray.push(itemValue);

            // add item state to the stateArray
            stateArray.push(itemState);

            // append the name to the list
            var addToList;
            addToList = function() {
                $('#itemList').append("<div class='item' id='" + itemID
                    + "'><div id='checkBox'></div><div id='content'>" + itemValue + "</div></div>");
            };
            addToList();

            // CHANGE ITEM STATUS
            var changeStatus;
            changeStatus = function () {
                if ($(this).parent('div').hasClass('done')) {
                    $(this).parent('div').removeClass('done');
                    $(this).css('backgroundColor', '#ffdddd');
                    pend++;
                    done--;
                    stats();
                }
                else {
                    $(this).parent('div').addClass('done');
                    $(this).css('backgroundColor', '#aaefaa');
                    pend--;
                    done++;
                    stats();
                }
            };
            $('#' + itemID).on('click', '#checkBox', changeStatus);

            // reset the input field and focus it.
            $('#text').val("").focus();

            itemID++;
            pend++;
            stats();

        }
    };


    $('#addButton').click(addItem);
    $('#text').keyup(function (e) {
        if (e.keyCode === 13) {
            addItem();
        }
    });

    $('#clearButton').click(function () {
        stateArray = [];
        valueArray = [];
        /*  for (var i = 0; i < itemID; i++)
         {

         } */
    });
});