import React from 'react'
import Bg from '@atlaskit/badge';

export default function Badge({children,appearance="primary",max=1000}) {
	return (
        <Bg max={max} appearance={appearance}>{children}</Bg>
	)
}
