// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // Gets the current date and print it to the BOM
  var getDate = dayjs();
  var currentHour = getDate.format("H");
  $("#currentDay").text(getDate.format("dddd, MMMM D, YYYY"));

  // Display the hour rows
  var businessHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];

  // Prints a hour div with the given hour #
  var hourRow = function (hour) {
    return $(`<div id='hour-${hour}' class='row time-block ${
      hour == currentHour ? "present" : hour < currentHour ? "past" : "future"
    }'>
  <div class='col-2 col-md-1 hour text-center py-3'>${hour}:00</div>
  <textarea id='hour-${hour}-description' class='col-8 col-md-10 description' rows='3'> </textarea>
  <button id='hour-${hour}-btn' class='btn saveBtn col-2 col-md-1' aria-label='save'>
    <i class='fas fa-save' aria-hidden='true'></i>
  </button>
</div>`);
  };

  // Iterate through the business hours to append them to the hours container
  $.each(businessHours, function (index, value) {
    $("#hours-container").append(hourRow(value));
  });

  // Event listener to detect any click event on <button> elements inside the element #hours-container
  $("#hours-container").on("click", "button", function (event) {
    var id = event.currentTarget.id.slice(0, 7);
    var value = $(`#${id}-description`).val();
    localStorage.setItem(id, value);
  });

  // Reads the localStorage and prints the results on their respective textareas
  $.each(businessHours, function (index, id) {
    var savedValue = localStorage.getItem(`hour-${id}`);
    $(`#hour-${id}-description`).val(savedValue);
  });
});
