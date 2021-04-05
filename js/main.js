// jquery //////////////////

$(document).ready(function() {

    // first slide
    function clickSo(text) {
        $('#housonepast').text(text);
        $('.step__button_next_one').addClass('button-select');
    }
    $('.soone, .sotwo, .sothree').click(function() {
        clickSo($(this).data('text'));
    });

    // second slide
    function clickSt(text_el) {
        var text = $("." + text_el).text();
        $('#housTwopast').text(text);
        $('.step__button_next_two').addClass('button-select');
    }

    $('.stone, .sttwo, .stthree, .stfoure').click(function() {
        clickSt($(this).data('text_el'))
    });

    // three slide
    function clickSf(text) {
        $('#housThreepast').text(text);
        $('.step__button_next_three').addClass('button-select');
    }

    $('.sf').click(function() {
        clickSf($(this).find('p.housone').text());
    });

    // validation filds
    $(".step__last_next").on("click", function() {
        if ($("#typeProject").text() && $("#sowePrise").text() && $("#housonepast").text() && $("#housTwopast").text() && $("#housThreepast").text() !== "") {
            nextSteep(1);
        } else {
            alert('Fill in all the fields!');
        }
    })

    //  funfacts
    var windowWidth = $(window).width();
    let show = true;
    $("#last").on("click", function() {

        if (!show) return false;
        let countbox = "#funfacts"
            // console.log(top);
        let w_top = $(window).scrollTop();
        let e_top = $(countbox).offset().top;
        // console.log(w_top + " " + e_top);
        let w_height = $(window).height();
        let d_height = $(document).height();

        let e_height = $(countbox).outerHeight();
        // console.log(777);
        // console.log(w_top + " " + e_top);
        if (w_top + 600 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $(".numbers").each(function() {
                $(this).prop(".counter", 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 7000,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            show = false;
        }
    });
});
// hamburger-menu
var windowWidth = $(window).width();
if (windowWidth < 968) {
    $('#hamburger-menu').click(function() {
        if ($('#hamburger').hasClass('opens')) {
            $('#hamburger').removeClass('opens');
            $(".navbar-nav").css("display", "none");
        } else {
            $(".navbar-nav").css("display", "flex");
            $('#hamburger').addClass('opens');
        }
    });
}











// Tab function

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "flex";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        $('.step__button_rew').css('display', 'none');

    } else {
        $('.step__button_rew').css('display', 'inline');
    }
    if (n == x.length - 1) {
        $('.step__button_next').html('Submit');
    } else {
        // document.getElemenstByClassName("step__button_next").innerHTML = "ДАЛІ";
    }
    //... and run a function that will display the correct step indicator:
    document.querySelectorAll('.step').forEach(function(el) {
        el.classList.remove('active');
    });
    document.querySelectorAll('.step')[currentTab].classList.add('active');
}

function viewTab(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");

    // Exit the function if any field in the current tab is invalid:
    if (!validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    showTab(currentTab);
    return true;
    // Otherwise, display the correct tab:
}

function checkLastPage() {
    return (currentTab + 1 > document.querySelectorAll('.step').length - 1);
}

function nextSteep(n) {
    if (checkLastPage()) {
        alert('end')
        return false;
    }
    var status = viewTab(n);
    // console.log(status)
    if (status) {
        document.querySelectorAll(".step")[currentTab - 1].classList.add('finish');
    }
    var prise = ($("#Prise").val());
    document.querySelector('#sowePrise').innerText = prise;
}

function prevSteep(n) {
    var status = viewTab(n);
    document.querySelectorAll(".step")[currentTab].classList.remove('finish');
}

function validateForm() {
    // This function deals with validation of the form fields

    var x,
        y,
        i,
        valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].required == "true" && y[i].value == "") {
            // add an "invalid" class to the field:
            // y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i,
        x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
        // console.log(x)
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";

}
