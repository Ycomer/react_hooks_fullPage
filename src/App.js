import React, { useState, useEffect } from "react";
import "./App.css";

const offsetheight = document.documentElement.clientHeight;

function App() {
    const bannerList = [
        {
            bg: "#712331",
        },
        {
            bg: "#87d9e1",
        },
        {
            bg: "#8185d7",
        },
        {
            bg: "#e187cf",
        },
    ];

    const [fullPage, SetfulPage] = useState(1);
    const [fullPageNum, SetfullPageNum] = useState(false);

    useEffect(() => {
        const scroll = (e) => {
            let event = e || window.event;
            if (fullPageNum) {
                return false;
            }

            if (event.wheelDelta < 0) {
                if (fullPage >= 3) {
                    return false;
                }
                SetfullPageNum(true);
                pageInfo(fullPage + 1);
                setTimeout(() => {
                    SetfullPageNum(false);
                }, 1000);
            } else {
                console.log(fullPage);
                if (fullPage <= 0) {
                    return false;
                }
                SetfullPageNum(true);
                pageInfo(fullPage - 1);
                setTimeout(() => {
                    SetfullPageNum(false);
                }, 1000);
            }
        };

        let box = document.querySelector(".section");
        box.addEventListener("wheel", scroll);
        // console.log(box);
        return () => box.removeEventListener("wheel", scroll);
    });

    const pageInfo = (index) => {
        SetfulPage(index);
    };

    let fullPageLIst = [];
    bannerList.forEach((i, index) => {
        fullPageLIst.push(
            <div
                key={index}
                style={{ height: offsetheight + "px", background: i.bg }}
            />
        );
    });
    let fullList = [];
    bannerList.forEach((i, index) => {
        fullList.push(
            <div
                key={index}
                className={fullPage === index ? "color" : ""}
                onClick={() => SetfulPage(index)}
            />
        );
    });
    return (
        <div className="section" style={{ height: offsetheight + "px" }}>
            <div
                className="container"
                style={{
                    transform:
                        "translate3d(0px,-" +
                        fullPage * offsetheight +
                        "px, 0px)",
                }}
            >
                {fullPageLIst}
            </div>
            <div className="fixed-list">{fullList}</div>
        </div>
    );
}

export default App;
