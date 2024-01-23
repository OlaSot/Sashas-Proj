import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../store/slices/categoriesSlice";
import CategoryCard from "../CategoryCard/CategoryCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import s from "./Categories.module.css";
import { Pagination, Navigation } from "swiper/modules";

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <main className={s.categoriesMain}>
      <div className={s.navWrapper}>
        <Link className={s.links} to="/">
          Main page
        </Link>
        <div className={s.greyLine}></div>
        <Link id={s.currentLink} to="/categories">
          Categories
        </Link>
      </div>
      <h4 className={s.title}>Categories</h4>
      <div className={s.swiperContainer}>
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
          className={s.mySwiper}
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
    </main>
  );
}
export default Categories;
