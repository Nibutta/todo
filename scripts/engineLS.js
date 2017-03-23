/**
 * Created by Pete Dee on 22.03.17.
 */
$(document).ready(function () {
    var i = 0;
    var tPending = 0;                // done tasks (2)
    var tDone = 0;                   // pending tasks (1)

    // PARSING localStorage
    for (i = 0; i < localStorage.length; i++) {
        var itemID = "item-" + i;

        //if ()                      // check item status

        $('#items_wrap').append("<div class='item'><div id='checkBlock'></div><div id='" + itemID + "'>"
            + localStorage.getItem(itemID) + "</div><div class='killItem'></div></div>");
    }

    // ADDING ITEM
    var addItem = function() {
        if ($('#newItem').val() !== "") {

            var itemID = "item-" + i;                   // item ID
            var itemValue = $('#newItem').val();        // item value
            var itemState = 1;                          // item state:  pending

            localStorage.setItem(itemID, itemValue, itemState);

            $('#items_wrap').append("<div class='item'><div id='checkBlock'></div><div id='" + itemID + "'>"
                + itemValue + "</div><div class='killItem'></div></div>");

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
    $('#checkBlock').click(function() {
        if ($(this).parent('.item').hasClass('done'))
        {
            $(this).parent('.item').removeClass('done');
            $(this).css('backgroundColor', '#ff939d');
            itemState = 1;
            tDone--;
            tPending++;
        }
        else
        {
            $(this).parent('.item').addClass('done');
            $(this).css('backgroundColor', '#5def9d');
            itemState = 2;
            tDone++;
            tPending--;
        }
    });

    // EDIT ITEM
    $("#itemID").on('dblclick', function ()
    {
        var thisData = this.innerHTML,
            $el = $('<input type="text" class="editItem"/>');
        $(this).replaceWith($el);
        $el.val(thisData).focus();
        //$(this).find(".content").hide();
        //$(this).parent('li').$('.done-btn').hide();
    });

    // CLOSE EDIT FIELD ON ENTER
    $(".editItem").keydown(function(e)
    {
        if (e.keyCode === 13)
        {
            $(this).replaceWith($('<div id="' + itemID +'" class="item">' + $(this).val() + '</div>'));
        }
        if (e.keyCode == 27) {
            $('.editItem').remove();
        }
    });


    // CLEAR BUTTON (?) CLEARS ALL LOCALSTORAGE DATA
        $('#clearButton').click(function () {
            localStorage.clear();
        });

    // KILL ITEM
    $(".killItem").click(function (event) {
        item = $(this).parent('.item');
        itemID = item.attr('id');
        localStorage.removeItem(itemID);
        item.slideUp('slow', function () {
            item.remove();
        });

    });


});