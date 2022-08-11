import './circle.scss';

const Circle = ({ touch }) => {

	return (
		<div
			className='circle'
			style={{ left: touch?.clientX, top: touch?.clientY }}>{touch?.identifier}</div>
	);
};

export default Circle;
