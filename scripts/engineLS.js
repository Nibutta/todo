/**
 * Created by Pete Dee on 22.03.17.
 */
$(document).ready(function () {
    var i = 0;
    var tPending = 0;                // done tasks (2)
    var tDone = 0;                   // pending tasks (1)

    // PARSING localStorage
    for (i = 0; i < localStorage.length; i++) {
        var itemID = "task-" + i;

        //if ()                      // check item status

        $('#items_wrap').append("<div class='item' id='" + itemID + "'><div id='checkBlock'></div>"
            + localStorage.getItem(itemID) + "</div>");
    }

    // ADDING ITEM
    var addItem = function() {
        if ($('#newItem').val() !== "") {

            var itemID = "task-" + i;                   // item ID
            var itemValue = $('#newItem').val();        // item value
            var itemState = 1;                          // item state:  pending

            localStorage.setItem(itemID, itemValue, itemState);

            $('#items_wrap').append("<div class='item' id='" + itemID + "'><div id='checkBlock'></div>"
                + itemValue + "</div>");

            $('#newItem').val("");
            i++;
        }
        return false;
    }

    // adding item with ENTER / BUTTON
    $('#addButton').click(addItem);
    $('#newItem').keyup(function(e){
        if (e.keyCode === 13) {
            addItem();
        }
    });

    // CHANGE ITEM STATUS
    $('#checkBlock').on('click', function() {
        if ($(this).parent('div').hasClass('done'))
        {
            $(this).parent('div').removeClass('done');
            $(this).css('backgroundColor', 'red')
            itemState = 1;
            tDone--;
            tPending++;
        }
        else
        {
            $(this).parent('div').addClass('done');
            $(this).css('backgroundColor', 'green');
            itemState = 2;
            tDone++;
            tPending--;
        }
    });

    // EDIT ITEM
    $('.item').on('dblclick', function ()
    {
        var thisData = this.innerHTML,
            $el = $('<input type="text" class="editItem"/>');
        $(this).replaceWith($el);
        $el.val(thisData).focus();
        //$(this).find(".content").hide();
        //$(this).parent('li').$('.done-btn').hide();
    });

    // CLOSE EDIT FIELD ON ENTER
    $('.editItem').on('keyup', (function(e)
    {
        if (e.keyCode === 13)
        {
            $(this).replaceWith($('<div id="' + itemID +'" class="item">' + $(this).val() + '</div>'));
        }
        if (e.keyCode == 27) {
            $('.editItem').remove();
        }
    }));


    // CLEAR BUTTON (?)
        $('#clearButton').click(function () {
            localStorage.clear();
        });



    /*$('#items_wrap').on("click", "div", function (event) {
        self = $(this);
        itemID = self.attr('id');
        localStorage.removeItem(itemID);
        self.slideUp('slow', function () {
            self.remove();
        });

    });*/


});