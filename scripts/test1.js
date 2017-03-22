/**
 * Created by dunice on 22.03.17.
 */
function appendTaskToList(val) {
    $('#list').append("<li><div id='checkBlock'></div><div id='inner'>" + val + "</div>  <a href='#' class='done-btn'>Done</a> <a href='#' class='cancel-btn'>Cancel Task</a></li>");
}


if (localStorage['tasks']) {
    var tasks = JSON.parse(localStorage['tasks']);
}else {
    var tasks = [];
}

for(var i=0;i<tasks.length;i++) {
    appendTaskToList(tasks[i]);
}

var addTask = function(){
    // get value from #name input
    var val = $('#name').val();

    // add the task to the array
    tasks.push(val);

    // save to local storage
    localStorage["tasks"] = JSON.stringify(tasks);

    // append the name to the list
    appendTaskToList(val);

    // reset the input field and focus it.
    $('#name').val("").focus();
}

$('#add-btn').click(addTask);
$('#name').keyup(function(e){
    if (e.keyCode === 13) {
        addTask();
    }
});


// approach 1
/*$('.done-btn').click(function(){
 $(this).parent('li').addClass('done');
 });*/

// correct approach
$('.done-btn').live( 'click', function() {
    $(this).parent('li').addClass('done');
});
// CHANGE ITEM STATUS
$('#checkBlock').live('click', function() {
    if ($(this).parent('li').hasClass('done'))
    {
        $(this).parent('li').removeClass('done');
        $(this).css('backgroundColor', 'red')
    }
    else
    {
        $(this).parent('li').addClass('done');
        $(this).css('backgroundColor', 'green')
    }
});

// EDIT ITEM
$('#inner').live('dblclick', function ()
{
    var thisData = this.innerHTML,
        $el = $('<input type="text" class="editItem"/>');
    $(this).replaceWith($el);
    $el.val(thisData).focus();
    //$(this).find(".content").hide();
    $(this).parent('li').$('.done-btn').hide();
});
// CLOSE EDIT FIELD ON ENTER
$('.editItem').live('keydown', (function(e)
{
    if (e.keyCode === 13)
    {
        $(this).replaceWith($('<div id="inner">' + $(this).val() + '</div>'));
    }
    if (e.keyCode == 27) {
        $('.editItem').remove();
    }
}));

$('.cancel-btn').live( 'click', function() {
    $(this).parent('li').fadeOut();
});
