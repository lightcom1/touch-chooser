import './circle.scss';
import { memo } from 'react';

const Circle = ({ touch }) => {
	console.log('rerender circle');

	return (
		<div
			className='circle'
			style={{ left: touch.clientX, top: touch.clientY }}>{touch.identifier}</div>
	);
};

export default memo(Circle);
