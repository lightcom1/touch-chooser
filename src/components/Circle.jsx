import './circle.scss';

const Circle = ({ touch }) => {
	return (
		<div
			className={`circle${touch ? '' : ' hide'}`}
			style={{ left: touch?.clientX, top: touch?.clientY }}></div>
	);
};

export default Circle;
