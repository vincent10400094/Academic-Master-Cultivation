var last = -1;
var lastOption = 0;

function single(index, name) {

  var choice = 'single';

  var data = {
    name: name,
    choice: choice,
    index: index
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/choice',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);
}

function removeText(index, sum, name) {

  var data = {
    name: name,
    index: index,
    sum: sum
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/removeChoice',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);
}

function multiple(index, name) {

  var choice = 'multiple';

  var data = {
    name: name,
    choice: choice,
    index: index
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/choice',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);
}

function removeall(name, index) {
  var data = {
    name: name,
    index: index
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/testremove',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);
}

function insert(name, index) {
  var data = {
    name: name,
    index: index
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/testInsert',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);
}

function insertOption(name, index, sum) {
  var data = {
    name: name,
    index: index,
    sum: sum
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/insertOption',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);
}

function removeOneOption(name, index, sum, optionindex) {
  var data = {
    name: name,
    index: index,
    sum: sum,
    optionindex: optionindex
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/removeOneOption',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);
}

function convert(type, name, index, sum) {
  var data = {
    type: type,
    index: index,
    sum: sum,
    name: name
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/convertOption',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);
}


function sectionFocus(id) {
  var containerId = '#container' + id.toString();
  var btnGrouptId = '#btn-group-' + id.toString();
  var dropdownId = '#dropdown' + id.toString();
  $(containerId).css('box-shadow', '0px 0px 20px 0px rgba(0, 0, 0, 0.2), 0 10px 30px 0 rgba(0, 0, 0, 0.19)');
  $(containerId).css('border-left', 'solid #009688');
  $(btnGrouptId).show();
  $(dropdownId).show();
  if (last == -1) {
    last = id;
  } else if (last != id) {
    sectionFocusOut(last);
    last = id;
  }
}

function sectionFocusOut(id) {
  console.log(id);
  var titleId = '#title' + id.toString();
  var editId = '#title-edit' + id.toString();
  var containerId = '#container' + id.toString();
  var btnGrouptId = '#btn-group-' + id.toString();
  var dropdownId = '#dropdown' + id.toString();
  $(containerId).css('box-shadow', '0px 0px 0px 0px');
  $(containerId).css('border-left', '0px');
  $(btnGrouptId).hide();
  $(dropdownId).hide();
  $(titleId).show();
  $(editId).hide();
  editOptionOut(lastOption);
}

function formData(sum, length, index, name) {
  var formdata = JSON.stringify($('#form' + String(index)).serializeArray());
  var formname = '#form' + String(index);
  var ans_array = [];
  for (var i = length; i > 0; i--) {
    var now = sum - i;
    //console.log("now: " + now);
    var selected = [];
    $('input[id=' + now + ']:checked').each(function() {
      //console.log($(this).val())
      selected.push($(this).val());
    });
    ans_array.push(selected);
  //console.log(selected);
  //console.log($('input[name=' + now + ']:checked', '#form' + String(index)).val())
  }
  ans_array = JSON.stringify(ans_array);
  //console.log(ans_array);
  var data = {
    name: name,
    content: formdata,
    index: index,
    ans_array: ans_array
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:1209/testsave',
    data: data,
    dataType: 'application/json',
    success: function(data) {
      console.log('success');
      console.log(data);
    }
  });
  location.reload(true);

}

function edit(id) {
  var titleId = '#title' + id.toString();
  var editId = '#title-edit' + id.toString();
  $(titleId).hide();
  $(editId).show();
  $(editId).focus();
  $.material.init();
}

function editOption(id) {
  var optionId = '#option' + id.toString();
  var editId = '#optionedit' + id.toString();
  console.log(editId);
  $(optionId).hide();
  $(editId).show();
  if (lastOption) {
    if (lastOption != id) {
      editOptionOut(lastOption);
      lastOption = id;
    }
  } else {
    lastOption = id;
  }
  $(editId).focus();
}

function editOptionOut(id) {
  var optionId = '#option' + id.toString();
  var editId = '#optionedit' + id.toString();
  // console.log(optionId);
  $(editId).hide();
  $(optionId).show();
}

function h(e) {
  $(e).css({
    'height': 'auto',
    'overflow-y': 'hidden',
  }).height(e.scrollHeight - 20);
}

$('textarea').each(function() {
  h(this);
}).on('focus', function() {
  h(this);
});

//******* PIE CHART
function pie(correct_number, error_number) {


  var dataSet = [
    {
      label: "答對",
      data: correct_number,
      color: "#00A36A"
    },
    {
      label: "錯誤",
      data: error_number,
      color: "#DE000F"
    },
  ];



  var options2 = {
    series: {
      pie: {
        show: true,
        innerRadius: 0.5,
        label: {
          show: true
        }
      }
    }
  };

  $(document).ready(function() {

    $.plot($("#flot-placeholder1"), dataSet, options2);
  });


}
