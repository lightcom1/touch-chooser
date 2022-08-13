import './circle.scss';

const Circle = ({ touch, ind = -1, winnerId = -1 }) => {
	return (
		<div
			className='circle'
			style={{ left: touch?.clientX, top: touch?.clientY }}>
			<span className='circle-id'>
				{winnerId !== -1 ? winnerId + 1 : ind + 1}
			</span>
		</div>
	);
};

export default Circle;
