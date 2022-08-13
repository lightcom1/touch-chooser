import { useState, useEffect } from 'react';
import Circle from './components/Circle';
import './app.scss';

function App() {
	const [touches, setTouches] = useState([]);
	const [winnerId, setWinnerId] = useState(null);

	const handleTouch = e => {
		setTouches([...e.touches]);
	};
	const handleTouchEnd = e => {
		console.log('eC: ', e.changedTouches);
		
		if (touches.length > 1) {
			setTouches([...e.changedTouches]);
		} else {
			setTouches([...e.touches]);
		}
	};

	useEffect(() => {
		window.addEventListener('touchstart', handleTouch);
		window.addEventListener('touchend', handleTouchEnd);
		window.addEventListener('touchcancel', handleTouch);
		window.addEventListener('touchmove', handleTouch);

		if (winnerId !== null) {
			window.removeEventListener('touchstart', handleTouch);
			window.removeEventListener('touchend', handleTouchEnd);
			window.removeEventListener('touchcancel', handleTouch);
			window.removeEventListener('touchmove', handleTouch);
		}

		return () => {
			window.removeEventListener('touchstart', handleTouch);
			window.removeEventListener('touchend', handleTouchEnd);
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
			{winnerId !== null && <h1 className='title'>Winner: {winnerId + 1}</h1>}
			{touches.length > 0 &&
				winnerId === null &&
				touches.map(touch => <Circle touch={touch} key={touch.identifier} />)}

			{winnerId !== null && <Circle touch={touches[winnerId]} />}
		</div>
	);
}

export default App;
