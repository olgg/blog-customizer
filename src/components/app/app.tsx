import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [formParams, setFormParams] = useState(defaultArticleState);
	const [params, setParams] = useState(defaultArticleState);

	const onApply = () => {
		setParams(formParams);
	}

	const onReset = () => {
		setFormParams(defaultArticleState);
		setParams(defaultArticleState);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': params.fontFamilyOption.value,
					'--font-size': params.fontSizeOption.value,
					'--font-color': params.fontColor.value,
					'--container-width': params.contentWidth.value,
					'--bg-color': params.backgroundColor.value
				} as CSSProperties
			}>
			<ArticleParamsForm state={formParams} setState={setFormParams} onApply={onApply} onReset={onReset} />
			<Article />
		</main>
	);
};
