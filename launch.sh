#!/bin/sh +x

source .env
node dist/cli.js --token $NOTION_TOKEN --database $NOTION_DATABASE_ID