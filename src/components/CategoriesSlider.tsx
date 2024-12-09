/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";

const NextArrow = ({ onClick, categoriesLength }: any) => (
  <div
    onClick={onClick}
    className={`absolute -right-[45px] top-1/2 transform -translate-y-1/2 transition-all ease-in border hover:scale-110 hover:bg-gray-100 bg-white-500 text-black rounded-full p-2 cursor-pointer shadow-lg ${
      categoriesLength > 7 ? "" : "hidden"
    }`}
  >
    <ChevronRight className="text-black" size={24} />
  </div>
);

const PrevArrow = ({ onClick, categoriesLength }: any) => (
  <div
    onClick={onClick}
    className={`absolute -left-[45px] top-1/2 transform -translate-y-1/2 transition-all ease-in border hover:scale-110 hover:bg-gray-100 bg-white text-black rounded-full p-2 cursor-pointer shadow-lg ${
      categoriesLength > 7 ? "" : "hidden"
    }`}
  >
    <ChevronLeft className="text-black" size={24} />
  </div>
);

const CategoriesSlider = ({
  categories,
  activeCategory,
  scrollToCategory,
}: {
  categories: any;
  activeCategory: number | null;
  scrollToCategory: (categoryId: any) => void;
}) => {
  const sliderSettings = {
    // dots: false,
    infinite: false,
    // arrows: false,
    speed: 500,
    slidesToShow: categories?.length > 7 ? 7 : categories?.length,
    slidesToScroll: categories?.length > 7 ? 7 : categories?.length,
    nextArrow: <NextArrow to="next" categoriesLength={categories?.length} />,
    prevArrow: <PrevArrow to="prev" categoriesLength={categories?.length} />,
  };
  return (
    <div className="bg-white max-w-full flex-1">
      <Slider {...sliderSettings}>
        {categories.map((category: any) => (
          <div key={category?.id} className="">
            <button
              id={`category-${category?.id}`}
              onClick={() => scrollToCategory(category?.id)}
              className={`flex items-center gap-2 px-2 py-2 transition-all ${
                activeCategory === category?.id
                  ? "border-b-2 border-pink-500 text-pink-500"
                  : "text-gray-700 hover:bg-gray-200 rounded-md"
              }`}
            >
              {/* <p>{category?.id}</p> */}
              <span>{category?.name}</span>
              <span className="text-sm">
                ({category?.total_menu_items_count})
              </span>
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoriesSlider;
