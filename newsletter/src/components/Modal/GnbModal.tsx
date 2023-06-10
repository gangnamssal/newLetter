/** @jsxImportSource @emotion/react */
import dayjs from "dayjs";
import { useState } from "react";
import { css } from "@emotion/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { BiCalendarCheck } from "@react-icons/all-files/bi/BiCalendarCheck";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { NationObject, Prop } from "./GnbModalType";
import { getNowDate } from "../../customs/getNowDate";
import { useQueryClient } from "@tanstack/react-query";

const gnbModalStyle = (open: boolean) => css`
  width: 100%;
  height: 100%;

  p {
    margin: 0 0 4% 0;
    font-weight: 600;
    font-size: 1rem;
  }

  input {
    width: 93%;
    height: 10%;
    border: 1px solid #c4c4c4;
    border-radius: 7px;
    margin-bottom: 10%;
    padding-left: 5%;

    &::placeholder {
      color: #c4c4c4;
    }
  }

  /* 날짜 input 스타일 */
  .gnb-modal-datepicker {
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      color: #c4c4c4;
      margin-bottom: ${open ? "0%" : "8%"};
      right: 10%;
    }

    input {
      height: 5vh;
      margin-bottom: 0;
      margin-bottom: ${open ? "0%" : "10%"};

      &:disabled {
        background-color: white;
      }
    }
  }

  /* mui 캘린더 스타일 */
  .MuiDateCalendar-root {
    width: 95%;

    .MuiYearCalendar-root {
      width: 95%;
    }
  }

  .nation-button {
    height: 8%;
    width: auto;
    border-radius: 16px;
    margin: 0 3% 3% 0;
    padding: 0 2% 0 2%;
    font-weight: 400;
    cursor: pointer;
  }

  .gnb-modal-button {
    width: 100%;
    height: 15%;
    border: 0;
    border-radius: 16px;
    background-color: #3478f6;
    margin-top: 10%;
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }
`;

const yearDotMonthDotDate = (year: number, month: number, date: number) => {
  return `${year}.${month < 10 ? `0${month}` : month}.${
    date < 10 ? `0${date}` : date
  }`;
};

const nationInitialObj = () => {
  return {
    대한민국: false,
    중국: false,
    일본: false,
    미국: false,
    북한: false,
    러시아: false,
    프랑스: false,
    영국: false,
  };
};

function GnbModal({ dialogRef, setStore }: Prop) {
  const nowDate = getNowDate("-"); // 현재 날짜를 return하는 함수
  const queryClient = useQueryClient();

  const [headline, handleHeadline] = useState<string>("");
  const [datetime, handleDatetime] = useState<string>("");
  const [openDatePicker, handleOpenDatePicker] = useState<boolean>(false);
  const [datePickerValue, handleDatePickerValue] = useState<any>(
    dayjs(nowDate)
  );
  const [nationObject, handleNationObject] = useState<NationObject>(
    nationInitialObj()
  );

  const { $y: year, $M: month, $D: date } = datePickerValue;

  return (
    <div
      css={gnbModalStyle(openDatePicker)}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 헤드라인 */}
      <p>헤드라인</p>
      <input
        type="text"
        placeholder="검색하실 헤드라인을 입력해주세요."
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          handleHeadline(e.target.value)
        }
      />

      {/* 날짜 */}
      <p>날짜</p>
      <div
        className="gnb-modal-datepicker"
        onClick={() => handleOpenDatePicker((open: boolean) => !open)}
      >
        {/* 날짜 아이콘 */}
        <div className="icon">
          <BiCalendarCheck size={25} />
        </div>
        <input
          type="text"
          placeholder={datetime ? datetime : "날짜를 선택해주세요."}
          disabled
        />
      </div>

      {/* 캘린더 */}
      {openDatePicker ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={datePickerValue}
            onChange={(newValue) =>
              handleDatePickerValue(() => {
                // 날짜를 바꿨을 때 달력이 사라지는 현상 방지
                if (newValue.$y === year) {
                  handleOpenDatePicker(false);
                }
                handleDatetime(
                  yearDotMonthDotDate(newValue.$y, newValue.$M + 1, newValue.$D)
                );
                return newValue;
              })
            }
          />
        </LocalizationProvider>
      ) : null}

      {/* 국가 */}
      <p>국가</p>

      {Object.keys(nationObject).map((nation: string, index: number) => {
        return (
          <button
            className="nation-button"
            key={nation}
            css={{
              backgroundColor: `${nationObject[nation] ? "#82B0F4" : "white"}`,
              color: `${nationObject[nation] ? "#F2F2F2" : "#6D6D6D"}`,
              border: `${
                nationObject[nation]
                  ? "1px solid #F2F2F2"
                  : "1px solid rgba(0, 0, 0, 0.2)"
              }`,
            }}
            onClick={() => {
              handleNationObject((nations) => {
                nations[nation] = !nations[nation];
                return { ...nations };
              });
            }}
          >
            {nation}
          </button>
        );
      })}

      {/* 적용 버튼 */}
      <button
        className="gnb-modal-button"
        onClick={() => {
          const nationArr = Object.keys(nationObject).filter((nation) => {
            return nationObject[nation];
          });

          setStore({
            headline: headline,
            datetime: datetime,
            nations: nationArr,
          });

          // 쿼리 죽이기
          queryClient.invalidateQueries([
            "home-screen-api",
            { headline, datetime, nations: nationArr },
          ]);

          dialogRef.current?.close();
        }}
      >
        필터 적용하기
      </button>
    </div>
  );
}

export default GnbModal;
