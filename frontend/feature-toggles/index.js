'use strict';

const unleash = require('unleash-server');

const options = {
	adminAuthentication: "none",
	port: 8080,
	baseUriPath: "/features"
};

unleash.start(options);
