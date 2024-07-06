import React from 'react';

export default function A(props) {
	console.log('component A~~~重新渲染了');
	return (
		<div>
			<div>component A</div>
		</div>
	);
}

export const MemoA = React.memo(A);
