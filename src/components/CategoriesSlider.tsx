import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';

const NextArrow = ({ onClick }: any) => (
  <div
    onClick={onClick}
    className="absolute -right-[45px] top-1/2 transform -translate-y-1/2 transition-all ease-in border hover:scale-110 hover:bg-gray-100 bg-white-500 text-black rounded-full p-2 cursor-pointer shadow-lg"
  >
    <ChevronRight className="text-black" size={24} />
  </div>
);

const PrevArrow = ({ onClick }: any) => (
  <div
    onClick={onClick}
    className="absolute -left-[45px] top-1/2 transform -translate-y-1/2 transition-all ease-in border hover:scale-110 hover:bg-gray-100 bg-white text-black rounded-full p-2 cursor-pointer shadow-lg"
  >
    <ChevronLeft className="text-black" size={24} />
  </div>
);

const CategoriesSlider = ({categories, activeCategory, scrollToCategory}: {categories: any, activeCategory: string, scrollToCategory: (categoryId: string) => void}) => {
  
  const sliderSettings = {
    // dots: false,
    // infinite: true,
    // arrows: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <NextArrow to="next" />,
    prevArrow: <PrevArrow to="prev" />,
  };
  return (
    <div className="bg-white max-w-full">
                <Slider {...sliderSettings}>
                  {categories.map((category) => (
                    <div key={category.id} className="">
                      <button
                        id={`category-${category.id}`}
                        onClick={() => scrollToCategory(category.id)}
                        className={`flex items-center space-x-2 px-4 py-2 transition-all ${
                          activeCategory === category.id
                            ? "border-b-2 border-pink-500 text-pink-500"
                            : "text-gray-700 hover:bg-gray-200 rounded-md"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm">({category.count})</span>
                      </button>
                    </div>
                  ))}
                </Slider>
              </div>
  )
}

export default CategoriesSlider