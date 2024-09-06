#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ terminotion

	Options
		--token  Your Notion API token

	Examples
	  $ terminotion --token=XXXXX
`,
	{
		importMeta: import.meta,
		flags: {
			token: {
				type: 'string',
				isRequired: true,
			},
			"database": {
				type: 'string',
				isRequired: true,
			},
		},
	},
);

render(<App token={cli.flags.token} databaseId={cli.flags["database"]} />);
