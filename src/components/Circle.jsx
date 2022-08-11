import './circle.scss';

const Circle = ({ touch }) => {
	console.log('rerender circle');

	return (
		<div
			className='circle'
			style={{ left: touch.clientX, top: touch.clientY }}>{touch.identifier}</div>
	);
};

export default Circle;
