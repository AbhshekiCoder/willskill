import { React, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';
import 'swiper/swiper-bundle.css';
import axios from 'axios';
import '../../../CSS/coursenavbar.css';
import HidebarImg from '../../../assets/Hidebar.png';
import { Loader } from 'rsuite';
import { useNavigate } from 'react-router-dom';

let url = import.meta.env.VITE_URL;

export default function CoursesNavbar() {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [courses1, setCourses1] = useState([]);
  const [courses2, setCourses2] = useState([]);
  const [form, setForm] = useState('');

  const ShowBar = () => {
    setShow(true);
    document.querySelector('.search1').style.display = 'none';
    document.querySelector('.search2').style.display = 'block';
  };

  const Hidebar = () => {
    setShow(false);
    document.querySelector('.search1').style.display = 'block';
    document.querySelector('.search2').style.display = 'none';
  };

  const data = async () => {
    try {
      setLoading(true);
      const result = await axios.post(`${url}course_detail`);
      const array = result.data;

      setCourses1(array);
      setCourses2(array);

      const uniqueTypes = [...new Set(array.map(course => course.type))];
      setCourses(uniqueTypes);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    data();
    const interval = setInterval(() => {
      data();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const course_filter1 = (type) => {
    courses.forEach((t) => {
      const el = document.getElementById(t);
      if (el) {
        el.style.backgroundColor = t === type ? '#c084fc' : 'transparent';
      }
    });

    const filtered = courses2.filter((item) => item.type === type);
    setCourses1(filtered);
  };

  const handleSearchInput = (e) => {
    setForm(e.target.value.toUpperCase());
  };

  const handleSearch = () => {
    const filtered = courses2.filter((e) =>
      e.type.toUpperCase().includes(form)
    );
    setCourses1(filtered);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const course = (id) => {
    localStorage.setItem('id', id);
    Navigate('/courses');
  };

  const SkeletonCard = () => (
    <SwiperSlide className="h-fit rounded-2xl">
      <div
        className="border flex animate-pulse rounded-2xl h-60 bg-gray-200"
        style={{
          maxWidth: '100%',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <div className="w-full h-full bg-gray-300 rounded-tl-2xl rounded-bl-2xl" />
        <div className="w-2/3 h-full p-4 space-y-3">
          <div className="w-3/4 h-6 bg-gray-400 rounded" />
          <div className="w-full h-4 bg-gray-300 rounded" />
          <div className="w-5/6 h-4 bg-gray-300 rounded" />
          <div className="flex justify-end mt-5 space-x-3">
            <div className="w-20 h-9 bg-gray-400 rounded-full" />
            <div className="w-24 h-9 bg-gray-500 rounded-full" />
          </div>
        </div>
      </div>
    </SwiperSlide>
  );

  return (
    <div>
      {/* Navbar */}
      <div className="w-full mt-12">
        <div
          className={`w-11/12 h-10 flex items-center ${
            show ? 'justify-between' : 'justify-evenly'
          } pl-3 m-auto rounded-full`}
          style={{
            boxShadow:
              'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
          }}
        >
          {/* Nav Fields */}
          {!show && (
            <div className="Nav-Fields flex w-full justify-evenly text-gray-600 font-bold flex-nowrap whitespace-nowrap max-sm:justify-between" style={{ fontSize: '16px' }}>
              {loading ? (
                <div className="text-center w-full text-gray-500">
                  Loading categories...
                </div>
              ) : (
                courses.map((type) => (
                  <div
                    className="course_type rounded-full hover:bg-purple-400 hover:text-black hover:cursor-pointer"
                    onClick={() => course_filter1(type)}
                    id={type}
                    key={type}
                  >
                    <a className="hover:no-underline h-fit hover:text-black">{type}</a>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Search */}
          <div className="flex items-center h-full border-blue-700">
            {show && (
              <div className="ml-1">
                <img
                  src={HidebarImg}
                  className="h-6 w-6"
                  onClick={Hidebar}
                  alt="Hide"
                />
              </div>
            )}
            {show && (
              <div className="ml-10">
                <div className="input">
                  <input
                    type="text"
                    className="pl-2 w-full placeholder-gray-500 rounded-md outline-none"
                    placeholder="Search"
                    style={{ maxWidth: '900px', height: '33px' }}
                    onInput={handleSearchInput}
                    onKeyDown={handleEnter}
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className={`C-nav-SearchBar flex items-center ${
              show ? 'mr-8' : 'ml-7 mr-5'
            }`}
          >
            <i
              className="fa-solid fa-magnifying-glass cursor-pointer text-lg rounded-full hover:bg-purple-100 p-2 search1"
              onClick={ShowBar}
            ></i>
            <i
              className="fa-solid fa-magnifying-glass cursor-pointer text-lg rounded-full hover:bg-purple-100 p-2 search2 hidden"
              onClick={handleSearch}
            ></i>
          </div>
        </div>
      </div>

      {/* Swiper */}
      <div className="m-auto mt-16" style={{ maxWidth: '1400px' }}>
        <Swiper
          modules={[Autoplay, Thumbs, Navigation]}
          thumbs={true}
          loop={true}
          followFinger={true}
          grabCursor={true}
          simulateTouch={true}
          spaceBetween={30}
          breakpoints={{
            469: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1240: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-fit mt-6 z-0 max-lg:pl-6 max-lg:pr-6"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : courses1.map((Element) => (
                <SwiperSlide className="h-fit rounded-2xl" key={Element._id}>
                  <div
                    className="border flex rounded-2xl h-60 max-lg:h-fit max-md:h-60 max-lg:pb-3 max-md:pb-0 font-sans"
                    style={{
                      maxWidth: '100%',
                      backgroundColor: '#EDEDED',
                      boxShadow:
                        'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    }}
                  >
                    <div className="w-full h-full">
                      <img
                        src={`data:${Element.imageType};base64,${Element.image}`}
                        className="w-full h-full max-md:h-60 rounded-tl-2xl rounded-bl-2xl"
                        alt=""
                        style={{ height: '100%' }}
                      />
                    </div>

                    <div className="w-2/3 h-full">
                      <div className="ml-6 mt-4">
                        <p className="text-lg font-bold">{Element.title}</p>
                      </div>
                      <div className="ml-6 mt-2 mr-3 mb-1 text-gray-700">
                        <p className="max-sm:text-xs">
                          {Element.description.length > 129
                            ? Element.description.substr(0, 100) + '...'
                            : Element.description}
                        </p>
                      </div>
                      <div className="flex justify-end ml-6 mt-6 max-lg:mt-10 max-md:mt-5 max-sm:mt-6 max-sm:p-3">
                        <button className="w-20 rounded-full text-black font-semibold bg-purple-300 mr-3 max-sm:w-16 text-base max-sm:text-xs">
                          Preview
                        </button>
                        <button
                          className="w-24 rounded-full text-white bg-purple-700 mr-4 max-sm:w-16 text-base max-sm:text-xs"
                          onClick={() => course(Element._id)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
