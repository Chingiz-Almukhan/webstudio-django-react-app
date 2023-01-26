import React, { useEffect, useState } from 'react';
import './App.css';
import News from './news/news';
import NewsLoadingComponent from './news/newsLoading';
import axiosInstance from './axios';

function App() {
	const NewsLoading = NewsLoadingComponent(News);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allNews = res.data;
			setAppState({ loading: false, posts: allNews});
			console.log(res.data);
		});
	}, [setAppState]);
	return (
		<div className="App">
			<h1 className="mt-5 mb-5">Последние новости</h1>
			<NewsLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;