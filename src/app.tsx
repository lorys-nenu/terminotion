import React from 'react';
import Table from './ink-table.js';
import { Text } from 'ink';
import useNotion from './useNotion.js';

type Props = {
	token: string | undefined;
};

export default function App({ token = '' }: Props) {

	const dbData = useNotion({ token, dbId: "5395603fc06e45959832c3b6f803f643" })

	if (!dbData) {
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
