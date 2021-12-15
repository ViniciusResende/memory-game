import React, { Children, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import { getUniqueId } from '../../utils';
import { useInterval } from '../../hooks';

import { ArrowIcon } from '../../../public/svg';
import styles from './Slider.module.scss';

type SliderProps = {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  delay?: number;
  slidesToShow?: number;
  slideClassName?: string;
};

export const Slider = ({
  children,
  className,
  autoplay = true,
  delay = 2500,
  slidesToShow = 1,
  slideClassName,
  ...rest
}: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastCommand, setLastCommand] = useState<'next' | 'prev'>('next');
  const [delayState, setDelayState] = useState<number | null>(delay);

  useEffect(() => {
    if (!delayState) setDelayState(delay);
  }, [currentSlide]);

  useInterval(() => {
    nextSlide();
  }, delayState);

  const goToSlide = useCallback((value: number) => {
    setDelayState(null);
    setCurrentSlide(value);
  }, []);

  function nextSlide(clear?: boolean) {
    const childrenLen = Children.count(children) / slidesToShow;

    clear && setDelayState(null);

    if (currentSlide + 1 < childrenLen) {
      setCurrentSlide((prev) => prev + 1);
      setLastCommand('next');
    } else {
      setCurrentSlide(0);
      setLastCommand('next');
    }
  }

  function previousSlide() {
    const childrenLen = Children.count(children) / slidesToShow;

    setDelayState(null);

    if (currentSlide !== 0) {
      setCurrentSlide((prev) => prev - 1);
      setLastCommand('prev');
    } else {
      setCurrentSlide(childrenLen - 1);
      setLastCommand('prev');
    }
  }

  function divideChildContent(children: React.ReactNode) {
    const arrayChildren = Children.toArray(children);

    if (!Array.isArray(arrayChildren)) {
      return <div className={cx(styles.slide, slideClassName)}>{children}</div>;
    } else {
      return Children.map(arrayChildren, (_, index) => {
        const indexCorrected = index + 1;

        if (indexCorrected % slidesToShow === 0) {
          return (
            <div className={cx(styles.slide, slideClassName)}>
              {arrayChildren.slice(
                indexCorrected - slidesToShow,
                indexCorrected,
              )}
            </div>
          );
        }
      });
    }
  }

  function renderChildren(current: number) {
    const dividedChildren = divideChildContent(children);

    if (!Array.isArray(dividedChildren)) {
      return React.cloneElement(dividedChildren, {
        className: cx(
          styles.currentSlide,
          styles[lastCommand],
          dividedChildren.props.className,
        ),
      });
    } else {
      return Children.map(dividedChildren, (child, index) => {
        const isCurrent = cx({ [styles.currentSlide]: current === index });
        return React.cloneElement(child, {
          className: cx(isCurrent, styles[lastCommand], child.props.className),
        });
      });
    }
  }

  function renderArrows() {
    return (
      <div className={styles.arrows}>
        <button
          className={cx(styles.arrowLeft, styles.arrow)}
          onClick={() => previousSlide()}>
          <ArrowIcon />
        </button>

        <button
          className={cx(styles.arrowRight, styles.arrow)}
          onClick={() => nextSlide(true)}>
          <ArrowIcon />
        </button>
      </div>
    );
  }

  function renderDots(children: React.ReactNode) {
    const dividedChildren = divideChildContent(children);
    const thereIsMoreThanOneSlide = Array.isArray(dividedChildren);

    return (
      <ul className={styles.dots}>
        {thereIsMoreThanOneSlide &&
          dividedChildren.map((_, index) => (
            <li
              className={cx(styles.dotsBtn, {
                [styles.isActive]: currentSlide === index,
              })}
              onClick={() => goToSlide(index)}
              key={getUniqueId()}>
              {index + 1}
            </li>
          ))}
      </ul>
    );
  }

  return (
    <div className={cx(styles.content, className, styles.withArrow)} {...rest}>
      <div className={cx(styles.wrapper)}>{renderChildren(currentSlide)}</div>

      {Children.count(children) > 1 && renderDots(children)}
      {Children.count(children) > 1 && renderArrows()}
    </div>
  );
};
