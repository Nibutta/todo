function addListItem()
{
    var text = $('#newItem').val();
    $("#items_wrap").append('<div><input type="checkbox" class="checkMark"/><span class="text">'
        + text + ' </span><button class="removeItem"></button></div>');
    $("#newItem").val('');
}
function clearCompleted()
{
    $("#items_wrap .checkMark:checked").parent().remove();
}

function deleteItem()
{
    $(this).parent().remove();
}
function completed() {
    if
    (
        $(this).parent().css('textDecoration') == 'line-through' )
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
$(document).ready(function(){
    $('#newItem').keyup(function(e)
    {
        if (e.keyCode === 13)

        {
            addListItem();
        }
    });
    $(document).on('click', '.removeItem', deleteItem);
    $("#markAll").click(function ()
    {
        $('input:checkbox').not(this).prop('checked', this.checked);
        if ( $('div').css('textDecoration') == 'line-through' )
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
    $(document).on('click', '.checkMark', completed);
    $("#clearButton").click(clearCompleted);
    $('#items_wrap').on('dblclick', 'span', function ()
        {
            var thisData = this.innerHTML,
                $el = $('<input type="text" class="editItem"/>');
            $(this).replaceWith($el);
            $el.val(thisData).focus();
            $(this).find(".text").hide();
            $(this).find(".removeItem").hide();
        }
    );
    $('#items_wrap').on('keyup', '.editItem', (function(e)
    {
        if (e.keyCode === 13)
        {
            $(this).replaceWith($('<span class="text">' + $(this).val() + '</span>'));

        }
        if (e.keyCode == 27) {
            $('.editItem').remove();
        }
    }));
});