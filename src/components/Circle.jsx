import './circle.scss';
import { memo } from 'react';

const Circle = ({ touch }) => {
	return (
		<div
			className='circle'
			style={{ left: touch.clientX, top: touch.clientY }}></div>
	);
};

export default memo(Circle);
