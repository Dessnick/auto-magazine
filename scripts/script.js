let currentPositionOfScroll = 0;
const slide = document.querySelector(".slider-content__image");
const sliderContainer = document.querySelector(".slider-content");
const sliderArrowLeft = document.querySelector(
  ".slider-navigation__arrow_left"
);
const sliderArrowRight = document.querySelector(
  ".slider-navigation__arrow_right"
);

const getMarginRightOfElement = (element) => {
  const slideMargin = window.getComputedStyle(slide).marginRight;
  const slideMarginWidth = parseInt(slideMargin.slice(0, -2));

  return slideMarginWidth;
};

const getWidthSlideWithMargin = () => {
  const slideWidth = slide.clientWidth;
  const slideMargin = getMarginRightOfElement(slide);

  const slideWithMarginWidth = slideWidth + slideMargin;

  return slideWithMarginWidth;
};

const getSliderContentWidth = () => {
  const slideWidth = slide.clientWidth;
  const countOfSlides = document.querySelectorAll(
    ".slider-content__image"
  ).length;
  const slideMarginWidth = getMarginRightOfElement(slide);

  const sliderContentWidth =
    (slideWidth + slideMarginWidth) * countOfSlides - slideMarginWidth;

  return sliderContentWidth;
};

const getEndPositionOfScroll = () => {
  const sliderContentWidth = getSliderContentWidth();

  const endPositionOfScroll = sliderContentWidth - sliderContainer.clientWidth;

  return endPositionOfScroll;
};

const getNewPositionOfScrollRight = () => {
  const endPositionOfScroll = getEndPositionOfScroll();
  const slideWithMarginWidth = getWidthSlideWithMargin();
  const positionOfScrollBeforeLastSlide =
    endPositionOfScroll - slideWithMarginWidth;

  if (currentPositionOfScroll <= positionOfScrollBeforeLastSlide) {
    newPositionOfScroll = currentPositionOfScroll + slideWithMarginWidth;
  } else if (currentPositionOfScroll === endPositionOfScroll) {
    newPositionOfScroll = 0;
  } else {
    newPositionOfScroll = endPositionOfScroll;
  }

  return newPositionOfScroll;
};

const getNewPositionOfScrollLeft = () => {
  const endPositionOfScroll = getEndPositionOfScroll();
  const slideWithMarginWidth = getWidthSlideWithMargin();

  if (currentPositionOfScroll > slideWithMarginWidth) {
    newPositionOfScroll = currentPositionOfScroll - slideWithMarginWidth;
  } else if (currentPositionOfScroll === 0) {
    newPositionOfScroll = endPositionOfScroll;
  } else {
    newPositionOfScroll = 0;
  }

  return newPositionOfScroll;
};

const scrollSlider = (positionOfScroll) => {
  sliderContainer.scroll({
    left: positionOfScroll,
    behavior: "smooth",
  });

  currentPositionOfScroll = newPositionOfScroll;
};

const scrollRight = () => {
  newPositionOfScroll = getNewPositionOfScrollRight();
  scrollSlider(newPositionOfScroll);
};

const scrollLeft = () => {
  newPositionOfScroll = getNewPositionOfScrollLeft();
  scrollSlider(newPositionOfScroll);
};

sliderArrowLeft.addEventListener("click", scrollLeft);
sliderArrowRight.addEventListener("click", scrollRight);
