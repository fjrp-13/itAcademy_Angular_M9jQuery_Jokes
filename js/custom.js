const APP_PARAMS = {
    JOKE_API: 'http://api.icndb.com/jokes/random',
    DATA_FORMAT_ERROR: 'Incorrect data format'
};

/*
Función en formato jQuery
*/
function getJokeByAjax($joke, $errorMsg) {
    $errorMsg.hide().empty();
    $joke.empty();
    $.ajax({
        url: APP_PARAMS.JOKE_API,
        dataType: 'json'
    }).done(function( data, textStatus, jqXHR ) {
        try {
            $joke.html(data.value.joke);
        } catch(err) {
            $errorMsg.text(APP_PARAMS.DATA_FORMAT_ERROR).show();
        }
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        $errorMsg.text(textStatus).show();
    });
}

/*
Función en formato Fetch - Then/Catch
*/
function getJokeByFetchThen($joke, $errorMsg) {
    $errorMsg.hide().empty();
    $joke.empty();
    fetch(APP_PARAMS.JOKE_API)
    .then(res => res.json())
    .then((data) => {
        try {
            $joke.html(data.value.joke);
        } catch(err) {
            throw Error(APP_PARAMS.DATA_FORMAT_ERROR);
        }
    }).catch(err => {
        $errorMsg.html(err).show();
    });
}

/*
Función en formato Fetch - Async/Await
*/
async function getJokeByFetchAsyncAwait($joke, $errorMsg) {
    $errorMsg.hide().empty();
    $joke.empty();
    let response = await fetch(APP_PARAMS.JOKE_API);
    let data = await response.json(); // read response body and parse as JSON

    try {
        $joke.html(data.value.joke);
    } catch (error) {
        throw Error(APP_PARAMS.DATA_FORMAT_ERROR);
    }
}

/* jqReady */
$(function() {
    $('.joke-getter').click(function() {
        let $joke = $('#joke');
        let $errorMsg = $('#errorMsg');
        switch ($(this).attr('id')) {
            case 'getByAjax':
                getJokeByAjax($joke, $errorMsg);
                break;
            case 'getByFetchThenCatch':
                getJokeByFetchThen($joke, $errorMsg);
                break;
            case 'getByFetchAsyncAwait':
                getJokeByFetchAsyncAwait($joke, $errorMsg)
                .catch(error => {
                    $errorMsg.html(error).show();
                });
                break;
        }
    });
});