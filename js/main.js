//DOM
var $submitText = $('#botao-reiniciar');
var $textArea = $(".campo-digitacao");

//Variables
var tweetStormText = ""; 

$(document).ready(function() {

    $submitText.on('click', function(){
        // grabbing array with each subTweet as element
        var tweetStormArray = getTweetStormArray($('.campo-digitacao').val());

        // opening a twitter pop-up for each subTweet
        function postString() {
            tweetStormText = tweetStormArray.shift();

            inserePlacar(tweetStormText);

            if(tweetStormArray.length > 0) {
                setTimeout(function() {
                    postString();
                }, 50);
            }


        }
        postString();
        
    });
});

function getTweetStormArray(inputString) {
      
        // Variables
        var inputArray = inputString.split(' ');
        var tweetStormArray = [];
        var tweetIndex = 1;
        var subTweetArray = [];
        var subTweetCharCount = 0;

        // aux functions
        function tweetIndexStr() {
            return (tweetIndex).toString().concat('/');
        }

        function incrementTweetIndex() {
            tweetIndex++;
        }

        function  incrementSubTweetCharCount(word) {
            subTweetCharCount++;
        }

        function  lessThanOrEqualTo140(ifIAddThisWord) {
            var whitespacesToAdd = subTweetArray.length;
            var totalCharCount = tweetIndexStr().length + subTweetCharCount + ifIAddThisWord.length + whitespacesToAdd;
            return (totalCharCount <= 140) ? true : false;
        }

        function subTweetStr() {
            subTweetArray[0] = tweetIndexStr().concat(subTweetArray[0]);
            return subTweetArray.join(' ');
        }

        //logic
        inputArray.forEach(function(word){
            if(lessThanOrEqualTo140(word)) {
                // keeps adding words to tweet
                subTweetArray.push(word);
                subTweetCharCount += word.length;
            }
            else {
                // posts maxed out tweet
                tweetStormArray.push(subTweetStr());
                incrementTweetIndex();
                subTweetArray = [word];
                subTweetCharCount = word.length;
            }
        });

        if(subTweetArray.length > 0) {
            // posts last tweet
            tweetStormArray.push(subTweetStr());
        }
      
        return tweetStormArray;
    }





