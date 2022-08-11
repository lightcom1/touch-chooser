import { useState, useEffect } from 'react';
import Circle from './components/Circle';
import './app.scss';

function App() {
	const [touches, setTouches] = useState([]);
	const [winner, setWinner] = useState(null);

	const handleTouch = e => {
		setTouches([...e.touches]);
	};

	useEffect(() => {
		window.addEventListener('touchstart', handleTouch);
		window.addEventListener('touchend', handleTouch);
		window.addEventListener('touchcancel', handleTouch);
		window.addEventListener('touchmove', handleTouch);

		return () => {
			window.removeEventListener('touchstart', handleTouch);
			window.removeEventListener('touchend', handleTouch);
			window.removeEventListener('touchcancel', handleTouch);
			window.removeEventListener('touchmove', handleTouch);
		};
	}, []);

	useEffect(() => {
		const chooseWinner = () => {
			const numOfTouches = touches.length;
			const winner = touches[Math.floor(Math.random() * numOfTouches)];
			console.log('winner: ', winner);
			setWinner(winner);

			setTimeout(() => {
				console.log('timeout winner');
				setWinner(null);
			}, 2000);
		};

		let timer = null;

		if (touches.length > 1) {
			clearTimeout(timer);
			console.log('clear timeout');

			timer = setTimeout(() => {
				chooseWinner();
			}, 2000);
		}

		return () => {
			clearTimeout(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [touches.length]);

	return (
		<div className='app'>
			<h1 className={`title${touches.length > 0 ? ' fade-out' : ''}`}>
				Touch the screen
			</h1>
			{touches.length > 0 &&
				winner !== null &&
				touches.map(touch => <Circle touch={touch} key={touch.identifier} />)}

			{winner && <Circle touch={winner} key={winner.identifier} />}
		</div>
	);
}

export default App;
