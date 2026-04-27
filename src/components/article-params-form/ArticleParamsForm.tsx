import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useState } from 'react';
import clsx from 'clsx';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

// 8 918 405 08 58

type ArticleParamsFormProps = {
	state: ArticleStateType,
	setState: React.Dispatch<React.SetStateAction<ArticleStateType>>,
	onApply: () => void,
	onReset: () => void
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const arrowClick = () => {
		setIsOpen(!isOpen);
	};

	const fontChanged = (selectedFont: OptionType) => { props.setState( {...props.state, fontFamilyOption: selectedFont} )};
	const sizeChanged = (selectedSize: OptionType) => { props.setState( {...props.state, fontSizeOption: selectedSize} )};
	const colorChanged = (selectedColor: OptionType) => { props.setState( {...props.state, fontColor: selectedColor} )};
	const bgColorChanged = (selectedBgColor: OptionType) => { props.setState( {...props.state, backgroundColor: selectedBgColor} )};
	const widthChanged = (selectedWidth: OptionType) => { props.setState( {...props.state, contentWidth: selectedWidth} )};

	const containerStyles = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={arrowClick} />
			<aside className={containerStyles}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}
						children='Задайте параметры'
					/>
					<Select
						selected={props.state.fontFamilyOption}
						onChange={fontChanged}
						options={fontFamilyOptions}
						title='Шрифт'
					/>

					<RadioGroup
						selected={props.state.fontSizeOption}
						name='radio'
						onChange={sizeChanged}
						options={fontSizeOptions}
						title='Название радиогруппы'
					/>

					<Select
						selected={props.state.fontColor}
						onChange={colorChanged}
						options={fontColors}
						title='цвет шрифт'
					/>

					<Separator />

					<Select
						selected={props.state.backgroundColor}
						onChange={bgColorChanged}
						options={backgroundColors}
						title='цвет фона'
					/>

					<Select
						selected={props.state.contentWidth}
						onChange={widthChanged}
						options={contentWidthArr}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={props.onReset} />
						<Button title='Применить' htmlType='submit' type='apply' onClick={props.onApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
