import React from 'react';
import Table from './ink-table.js';
import { Text, useInput } from 'ink';
import useNotion from './useNotion.js';

type Props = {
	token: string;
	databaseId: string;
};

export default function App({ token, databaseId }: Props) {

	const { data: dbData, loading, refresh } = useNotion({ token, databaseId: databaseId })

	useInput((input) => {
		if (input === 'q') {
			process.exit();
		}
		if (input === 'r') {
			if (loading) return
			refresh();
		}
	})

	if (loading) {
		return <Text>Loading...</Text>
	}

	const columns = [
		"uniqueId",
		"title",
		"status",
	]

	return (
		// @ts-ignore
		<Table data={dbData} columns={columns} padding={2} />
	)
}
