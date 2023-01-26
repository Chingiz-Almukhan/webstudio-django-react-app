import React from 'react';

function NewsLoading(Component) {
	return function NewsLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				Загрузка...
			</p>
		);
	};
}
export default NewsLoading;