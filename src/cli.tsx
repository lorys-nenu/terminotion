#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ terminotion

	Options
		--name  Your name

	Examples
	  $ terminotion --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			token: {
				type: 'string',
			},
		},
	},
);

render(<App token={cli.flags.token} />);
