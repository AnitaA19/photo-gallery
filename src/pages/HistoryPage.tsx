import React, { useState } from 'react';
import Header from '../components/Header';
import PopularPhotos from '../components/PopularPhotos';
import { useSearchHistory } from '../context/SearchHistoryContext';
import styles from './HistoryPage.module.css';

const HistoryPage: React.FC = () => {
	const { searchHistory } = useSearchHistory();
	const [selectedQuery, setSelectedQuery] = useState<string>('');

	const handleReset = () => {
		setSelectedQuery('');
	};

	return (
		<div>
			<Header 
				searchQuery={selectedQuery} 
				setSearchQuery={setSelectedQuery} 
				onSearch={(query: string) => setSelectedQuery(query)} 
				onReset={handleReset} 
			/>
			
			<div className={styles.historyContainer}>
				<div className={styles.searchHistory}>
					<h2 className={styles.historyTitle}>Search History</h2>
					<ul className={styles.historyList}>
						{searchHistory.map((query, index) => (
							<li key={index}>
								<button
									className={`${styles.historyItem} ${selectedQuery === query ? styles.selected : ''}`}
									onClick={() => setSelectedQuery(query)}
								>
									{query}
								</button>
							</li>
						))}
					</ul>
				</div>
				
				{selectedQuery && (
					<div className={styles.historyPhotos}>
						<PopularPhotos searchQuery={selectedQuery} />
					</div>
				)}
			</div>
		</div>
	);
};

export default HistoryPage;