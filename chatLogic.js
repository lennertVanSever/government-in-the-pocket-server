import request from 'request';

const facebookPageToken = process.env.facebookPageToken;

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:facebookPageToken},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log(response);
		    console.log('Error 19: ', response.body.error)
	    }
    })
}

module.exports = {
	main(event, sender){
		if (event.postback) {
			console.log(event.postback);
		}
		if (event.message && event.message.text) {
	  	    let text = event.message.text
	  	    sendTextMessage(sender, "message received");
	    }
	}
}