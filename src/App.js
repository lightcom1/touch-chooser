import { useState, useEffect } from 'react';
import Circle from './components/Circle';
import './app.scss';

function App() {
	const [touches, setTouches] = useState([]);
	const [winnerId, setWinnerId] = useState(null);

	const handleTouch = e => {
		setTouches([...e.touches]);
	};

	useEffect(() => {
		window.addEventListener('touchstart', handleTouch);
		window.addEventListener('touchend', handleTouch);
		window.addEventListener('touchcancel', handleTouch);
		window.addEventListener('touchmove', handleTouch);

		if (winnerId !== null) {
			window.removeEventListener('touchstart', handleTouch);
			window.removeEventListener('touchend', handleTouch);
			window.removeEventListener('touchcancel', handleTouch);
			window.removeEventListener('touchmove', handleTouch);
		}

		return () => {
			window.removeEventListener('touchstart', handleTouch);
			window.removeEventListener('touchend', handleTouch);
			window.removeEventListener('touchcancel', handleTouch);
			window.removeEventListener('touchmove', handleTouch);
		};
	}, [winnerId]);

	useEffect(() => {
		const chooseWinner = () => {
			const winner = touches[Math.floor(Math.random() * touches.length)];
			const winnerId = touches.findIndex(
				t => t.identifier === winner.identifier
			);
			setWinnerId(winnerId);

			setTimeout(() => {
				setWinnerId(null);
				setTouches([]);
			}, 3000);
		};

		let timer = null;

		if (touches.length > 1) {
			clearTimeout(timer);

			timer = setTimeout(() => {
				chooseWinner();
			}, 3000);
		}

		return () => {
			clearTimeout(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [touches.length]);

	return (
		<div className='app'>
			<h1
				className={`title${
					touches.length > 0 || winnerId !== null ? ' fade-out' : ''
				}`}>
				Touch the screen
			</h1>
			<h1 className={`title title--winner${winnerId !== null ? ' fade-in' : ''}`}>Winner: {winnerId + 1}</h1>
			{touches.length > 0 &&
				winnerId === null &&
				touches.map((touch, ind) => (
					<Circle ind={ind} touch={touch} key={touch.identifier} />
				))}

			{winnerId !== null && (
				<Circle touch={touches[winnerId]} winnerId={winnerId} />
			)}
		</div>
	);
}

export default App;
