import React from 'react';
import Table from './ink-table.js';
import { Text, useInput } from 'ink';
import useNotion from './useNotion.js';

type Props = {
	token: string | undefined;
};

export default function App({ token = '' }: Props) {

	const { data: dbData, loading, refresh } = useNotion({ token, dbId: "5395603fc06e45959832c3b6f803f643" })

	console.log(loading, dbData)

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
