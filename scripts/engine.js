/**
 * Created by Pete Dee on 21.03.17.
 */
function addListItem() {
    var content = $('#newItem').val();
    $('#items_wrap').append('<div><div class="item_inner_wrap"><input type="checkbox" class="checkMark"/><span>'
        + content + '</span></div><div class="removeItem"></div></div>');
    $('#newItem').val('');
}

function removeCompleted() {
    $('#items_wrap .checkMark:checked').parent().remove();
}

function deleteItem () {
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
    $(document).on('click', '.removeItem', deleteItem);
    $('#markAll').click(function() {
        $('input:checkbox').not(this).prop('checked', this.checked);
        if ($('div').css('textDecoration') == 'line-through')
        {
            $('div').css('textDecoration', 'none');
            $('div').parent().css('opacity', '1');
        }
        else
        {
            $('div').css('textDecoration', 'line-through');
            $('div').parent().css('opacity', '0.5');
        }
    });
    $(document).on('click', '.checkMark', completedItems);
    $('#clearButton').click(removeCompleted);
    $('#items_wrap').on('dblclick', 'span', function ()
        {
            var thisData = this.innerHTML,
                $el = $('<input type="text" class="editItem"/>');
            $(this).replaceWith($el);
            $el.val(thisData).focus();
            $(this).find(".content").hide();
            $(this).find(".removeItem").hide();
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