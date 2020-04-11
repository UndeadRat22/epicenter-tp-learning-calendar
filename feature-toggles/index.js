'use strict';

const unleash = require('unleash-server');
const cors = require('cors');

const options = {
	adminAuthentication: "none",
	port: 4242,
	preHook: (app) => {
		app.use(cors())
	}
};

unleash.start(options)
	.then(unleash => {
	    console.log(
	      `Feature toggles started on http://localhost:${unleash.app.get('port')}`
	    );
	 });
