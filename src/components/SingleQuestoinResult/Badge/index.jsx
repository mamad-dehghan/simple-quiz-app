import React from 'react';

function Badge({text}) {
	return (
		<span
			className={`bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded select-none`}>{text}</span>
	);
}

export default Badge;