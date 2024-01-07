import React from 'react'
import AvatarGroup from '@atlaskit/avatar-group';

export default function Avatar({users})
{
	const USERS = users.map((d) => ({
		email: d.email,
		key: d.email,
		name: d.name,
		href: '',
		src: d.image,
	}));

	return <AvatarGroup appearance="stack" data={USERS} />;
}
