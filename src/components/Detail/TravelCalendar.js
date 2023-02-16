import React, { useState } from "react";
import ButtonGroup from "./ButtonGroup";
import RecommendationCard from "./RecommendationCard";
import Calendar from "react-calendar";
import moment from "moment";
import "../../Calendar.css";
import { MdOutlinePlace, MdStorefront } from "react-icons/md";
import { RiDeleteBin6Line, RiHotelLine } from "react-icons/ri";
import { BiCalendarHeart } from "react-icons/bi";
function TravelCalendar({ place }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // 달력 안보였다가 보이게
  const [visible, setVisible] = useState(false);
  const openCalendar = () => {
    setVisible(!visible);
  };
  const closeCalendar = () => {
    setVisible(false);
    setStartDate();
    setEndDate();
  };
  const changeDate = (e) => {
    // event를 받아서 yyyy/mm/dd 형식으로 일자를 포맷팅해줌
    // e[0]은 사용자가 여행 일자로 선택한 시작 일자가 들어감
    // e[1]은 사용자가 여행 마치는 일자로 선택한 일자가 들어감
    const startDateFormat = moment(e[0]).format("YYYY/MM/DD");
    const endDateFormat = moment(e[1]).format("YYYY/MM/DD");
    // 여행 시작일자와 마치는일자의 값이 변할 때마다 값을 다시 세팅해줌
    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
  };
  // 버튼
  const arr = [
    { title: "음식점", icon: <MdStorefront /> },
    { title: "관광명소", icon: <MdOutlinePlace /> },
    { title: "숙박시설", icon: <RiHotelLine /> },
  ];
  const [filters, setFilter] = useState(arr[0].title);
  // + 버튼을 x 로 바꾸기
  return (
    <div className="w-[360px]">
      <h2 className="text-center my-8 mt-12 text-4xl font-bold">
        {place.name}
      </h2>
      <p className="text-center mt-4 text-stone-400 text-lg font-Mont">
        {place.engname}
      </p>
      <div className="mx-7 my-5">
        <button onClick={openCalendar} className="p-2">
          <BiCalendarHeart />
        </button>
        <input
          type="text"
          className="w-[120px]  p-2 text-xl border-green1 border-b-4 bg-transparent outline-none opacity-70 my-5 rounded-xl"
          placeholder="출발하는 날"
          value={startDate || ""}
          disabled
        />
        <span className="text-xl my-auto px-2">~</span>
        <input
          type="text"
          className="w-[120px]  p-2 text-xl border-green1 outline-none bg-transparent opacity-70 border-b-4 rounded-xl"
          placeholder="돌아오는 날"
          value={endDate || ""}
          disabled
        />
      </div>
      {visible && (
        <div className="px-11 absolute z-20">
          <Calendar
            calendarType="US"
            className="font-semibold relative"
            onChange={changeDate}
            selectRange={true}
            formatDay={(locale, date) => moment(date).format("D")}
          ></Calendar>
          {/* <div className="text-end">
            <button
              className="px-3 py-1 rounded-lg bg-main text-white"
              onClick={closeCalendar}
            >
              닫기
            </button>
            <button
              className="p-1 m-2 rounded-lg bg-main text-white"
              onClick={() => setVisible(false)}
            >
              적용하기
            </button>
          </div> */}
        </div>
      )}
      <p className="text-center  my-8 ">선택목록</p>
      <div className="flex relative items-center justify-center">
        <ButtonGroup filters={filters} arr={arr} setFilter={setFilter} />
      </div>
      <button className="flex p-5 text-xs">
        <RiDeleteBin6Line className="my-auto" />
        전체삭제
      </button>
      <RecommendationCard />
    </div>
  );
}
export default TravelCalendar;
