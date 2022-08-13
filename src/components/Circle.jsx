import './circle.scss';

const Circle = ({ touch, ind = -1, winner }) => {
	return (
		<div
			className='circle'
			style={{ left: touch?.clientX, top: touch?.clientY }}>
			<span className='circle-id'>
				{winner ? touch.identifier + 1 : ind + 1}
			</span>
		</div>
	);
};

export default Circle;
