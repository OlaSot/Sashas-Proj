import s from "./Category.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function CategoryList() {
  const categories = useSelector((state) => state.categories.categories);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className={s.categoriesSamples}>
      <div className={s.title}>
        <h4>Categories</h4>
        <div className={s.line}></div>
        <Link className={s.link} to="/categories">
          All categories
        </Link>
      </div>
      <div className="swiper-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <ul className={s.categoryWrapper}>
            {categories.map((category) => {
              return (
                <SwiperSlide key={category.id}>
                  <CategoryCard key={category.id} {...category} />
                </SwiperSlide>
              );
            })}
          </ul>
        </Swiper>
      </div>
    </section>
  );
}
export default CategoryList;
