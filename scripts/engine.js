/**
 * Created by Peter Dee on 21.03.17.
 */
function addListItem() {
    var content = $('#newItem').val();
    $('#items_wrap').append('<div id="item_block"><input type="checkbox" class="markItem"/><span>'
        + content + '</span><button class="bRemoveItem"></button></div>');
    $('#newItem').val('');
}

function removeCompleted() {
    $('#items_wrap .markItem:checked').parent().remove();
}

function removeItem () {
    $(this).parent().remove();
}

function completedItems() {
    if ($(this).parent().css('textDecoration') == 'line-through')
    {
        $(this).parent().css('textDecoration', 'none');
        $(this).parent().css('opacity', '1');
    }
    else
    {
        $(this).parent().css('textDecoration', 'line-through');
        $(this).parent().css('opacity', '0.50');
    }
}

$(document).ready(function() {
    $('#newItem').keyup(function(e)
        {
            if (e.keyCode === 13)
            {
                addListItem();
            }
        });
    $(document).on('click', '.bRemoveItem', removeItem);
    $('#markAll').click(function() {
        $('input:checkbox').not(this).prop('checked', this.checked);
        if ($('#item_block').css('textDecoration') == 'line-through')
        {
            $('#item_block').css('textDecoration', 'none');
            $('#item_block').parent().css('opacity', '1');
        }
        else
        {
            $('#item_block').css('textDecoration', 'line-through');
            $('#item_block').parent().css('opacity', '0.5');
        }
    });
    $(document).on('click', '.markItem', completedItems);
    $('#clearComp').click(removeCompleted);
    $('#items_wrap').on('dblclick', 'span', function ()
        {
            var thisData = this.innerHTML,
                $el = $('<input type="text" class="editItem"/>');
            $(this).replaceWith($el);
            $el.val(thisData).focus();
            $(this).find(".content").hide();
            $(this).find(".bRemoveItem").hide();
        });
    $('#items_wrap').on('keyup', '.editItem', (function(e)
    {
        if (e.keyCode === 13)
        {
            $(this).replaceWith($('<span>' + $(this).val() + '</span>'));
        }
        if (e.keyCode == 27) {
            $('.editItem').remove();
        }
    }));
});