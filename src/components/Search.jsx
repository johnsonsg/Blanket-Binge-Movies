import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
	return (
		<div className="search">
			<div>
				<img src="search.svg" alt="Search" />

				<input
					type="text"
					placeholder="Search through thousands of movies"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				{searchTerm && (
					<button
						type="button"
						className="clear-btn"
						aria-label="Clear search"
						onClick={() => setSearchTerm('')}
					>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18 17.94 6M18 18 6.06 6"
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	)
}

export default Search
