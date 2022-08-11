import { useState, useEffect } from 'react';
import Circle from './components/Circle';
import './app.scss';

function App() {
	const [touches, setTouches] = useState([]);
	const [winner, setWinner] = useState(false);

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
			const winner = touches[Math.floor(Math.random() * touches.length)];
			setTouches(prev => prev.filter(t => t.identifier === winner.identifier));
			console.log(touches);
			setWinner(true);

			setTimeout(() => {
				setWinner(false);
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
			<h1 className={`title${touches.length > 0 || winner ? ' fade-out' : ''}`}>
				Touch the screen
			</h1>
			{touches.length > 0 &&
				winner === false &&
				touches.map(touch => <Circle touch={touch} key={touch.identifier} />)}

			{winner && <Circle touch={touches} />}
		</div>
	);
}

export default App;
