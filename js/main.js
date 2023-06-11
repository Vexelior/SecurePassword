var checkboxes = $('input[type="checkbox"]:checked');
var uppercaseBox = $('#uppercase');
var specialCharactersBox = $('#special');
var rangeSlider = $('#length-display').val();
var characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]\:;?><,./-=',
};
const successBanner = document.querySelector('.alert-success');
const errorBanner = document.querySelector('.alert-danger');

function GeneratePassword() {
    // Check if the uppercase and special characters boxes are checked
    var uppercaseCheck = uppercaseBox.is(':checked');
    var specialCharactersCheck = specialCharactersBox.is(':checked');

    // Get the length of the password from the slider
    var length = $('#length-display').val();

    // Create a variable to store the password
    var password = '';

    // From the checked boxes, get the characters that will be used to generate the password
    var charactersToUse = '';
    charactersToUse += characters.numbers;
    charactersToUse += characters.lowercase;

    if (uppercaseCheck == true) {
        charactersToUse += characters.uppercase;
    }

    if (specialCharactersCheck == true) {
        charactersToUse += characters.symbols;
    }

    if (length != null) {
        length = parseInt(length);
        // Constraint the length of the password to be between 8 and 128 characters long
        if (length < 8) {
            length = 8;
        }
        if (length > 36) {
            length = 36;
        }
    }

    if (length == null) {
        length = 8;
    }
    
    // If the uppercase and special characters boxes are checked, shuffle the password
    if (charactersToUse.length > 0) {
        charactersToUse = Shuffle(charactersToUse);    
    }

    function Shuffle(string) {
        var array = string.split('');
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array.join('');
    }

    // Generate the password
    for (var i = 0; i < length; i++) {
        charactersToUse.length = length;
        password += charactersToUse.charAt(Math.floor(Math.random() * charactersToUse.length));
    }

    // Return the password
    return password;
}

// When the slider is changed, update the input box
$('#length').on('input', function() {
    $('#length-display').val($(this).val());
});

// Fade in the app-container on load
$(document).ready(function() {
    var container = $('#app-container');
    $(container).fadeOut(0).fadeIn(1000);

    var passwordBox = $('#password');
    // When the user clicks on the password box, add the text to the clipboard
    $(passwordBox).on('click', function() {
        if (passwordBox.val() == '' || passwordBox.val() == null) {
            // Remove the success banner from the DOM
            $(successBanner).remove();
            // Add the error banner to the DOM
            errorBanner.classList.add('show');
            // Hide the error banner after 3 seconds
            setTimeout(function() {
                errorBanner.classList.remove('show');
            }, 3000);
            // Add the success banner back to the DOM
            $(successBanner).appendTo('.banners');
            return;
        } else {
            passwordBox.select();
            document.execCommand('copy');
            // Remove the error banner from the DOM
            $(errorBanner).remove();
            // Add the success banner to the DOM
            successBanner.classList.add('show');
            // Hide the success banner after 3 seconds
            setTimeout(function() {
                successBanner.classList.remove('show');
            } , 3000);
            // Add the error banner back to the DOM
            $(errorBanner).appendTo('.banners');
        }
    });
    
    // Do not allow the user to type in the password box
    $(passwordBox).on('keydown', function(e) {
        e.preventDefault();
    });
});

$('#generate').on('click', function() {
    var password = GeneratePassword();
    $('#password').val(password);
});