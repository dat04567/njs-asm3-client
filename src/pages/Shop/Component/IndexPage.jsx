import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

IndexPage.propTypes = {
	indexPage: PropTypes.array,
	handlerChangePage: PropTypes.func,
	pagination: PropTypes.object,
};

IndexPage.defaultProps = {
	indexPage: null,
	handlerChangePage: null,
	pagination: {},
};

function IndexPage({  handlerChangePage, page, totalPage } ) {
	console.log(totalPage);
	
	const indexPage = useMemo(() => 
		Array.from({length: totalPage}, (_, i) => i + 1)
	, [totalPage]);


	

	const onIndexPage = useCallback( (value) => {
		if (!handlerChangePage) {
			return;
		}

		handlerChangePage(value);
	},[handlerChangePage]);


	return (
		<div className='d-flex'>
			{indexPage &&
				indexPage.map((value) => (
					<li
						className={
							value === parseInt(page) ? 'page-item active' : 'page-item'
						}
						key={value}
						onClick={() => onIndexPage(value)}>
						<button className='page-link'>{value}</button>
					</li>
				))}
		</div>
	);
}

export default IndexPage;
