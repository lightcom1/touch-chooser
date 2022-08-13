import './circle.scss';

const Circle = ({ touch }) => {
	return (
		<div
			className='circle'
			style={{ left: touch?.clientX, top: touch?.clientY }}>
			<span className='circle-id'>{touch.identifier + 1}</span>
		</div>
	);
};

export default Circle;
