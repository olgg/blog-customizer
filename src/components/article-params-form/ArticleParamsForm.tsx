import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	defaultParams: ArticleStateType,
	onApply: React.Dispatch<React.SetStateAction<ArticleStateType>>
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [formParam, setFormParams] = useState(props.defaultParams);
	const [formOpen, setFormOpen] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (formOpen && e.key === 'Escape') {
				setFormOpen(false);
			}
		};

		const handleClick = (e: MouseEvent) => {
			if (formOpen && e.target instanceof Node && !formRef.current?.contains(e.target)) {
				setFormOpen(false);
			}
		};

		window.addEventListener('keypress', handleEsc);
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('keypress', handleEsc);
			window.removeEventListener('mousedown', handleClick);
		}
	});

	const handleArrowClick = () => {
		setFormOpen(!formOpen);
	};

	const handleChange = <K extends keyof ArticleStateType>(key: K) =>
    	(value: ArticleStateType[K]) =>
        	setFormParams((prev) => ({ ...prev, [key]: value }));

	const handleReset = () => {
		setFormParams(defaultArticleState);
		props.onApply(defaultArticleState);
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		props.onApply(formParam);

	}

	const containerStyles = clsx({
		[styles.container]: true,
		[styles.container_open]: formOpen
	});

	return (
		<>
			<ArrowButton isOpen={formOpen} onClick={handleArrowClick} />
			<aside className={containerStyles}>
				<form className={styles.form} ref={formRef} onSubmit={handleSubmit} onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}
						children='Задайте параметры'
					/>
					<Select
						selected={formParam.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
						options={fontFamilyOptions}
						title='Шрифт'
					/>

					<RadioGroup
						selected={formParam.fontSizeOption}
						name='radio'
						onChange={handleChange('fontSizeOption')}
						options={fontSizeOptions}
						title='размер шрифта'
					/>

					<Select
						selected={formParam.fontColor}
						onChange={handleChange('fontColor')}
						options={fontColors}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formParam.backgroundColor}
						onChange={handleChange('backgroundColor')}
						options={backgroundColors}
						title='цвет фона'
					/>

					<Select
						selected={formParam.contentWidth}
						onChange={handleChange('contentWidth')}
						options={contentWidthArr}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
