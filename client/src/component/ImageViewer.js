import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { DownloadSimple, X } from '@phosphor-icons/react';
import { useState } from "react";
const ImageViewer = ({ list, onClose }) => {
    const conversation = useSelector(state => state.conversation);
    const [currentIndex, setCurrentIndex] = useState(0);
    const settings = {
        dots: list.length <= 1 ? false : true,
        arrows:list.length <= 1 ? false : true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (val) => {
            setCurrentIndex(val);
        }
    };

    if (!list.length) {
        return <></>
    }
    return (
        <div className="fixed h-full w-full left-0 top-0 z-50 backdrop-blur-2xl flex justify-center items-center">
            <div className="w-full  h-full flex flex-col items-center ">
                <div className="bg-white py-5 w-full mb-8 flex items-center justify-between px-16 shadow-sm">
                    <div className="flex gap-4 items-center">
                        <div className="rounded-full cursor-pointer w-12 h-12 flex items-center justify-center relative">
                            <img className="object-contain" src={conversation.userDetail.avatar} alt="profile" />
                        </div>
                        <div>
                            <p className="text-base font-semibold">{conversation.userDetail.name}</p>
                            <p className="text-sm text-textSecondary">{conversation.userDetail.email}</p>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <div className="icon-btn" onClick={() => {
                            const anchor = window.document.createElement('a');
                            anchor.target = '_blank'
                            anchor.download = 'turbo_talk_img'
                            anchor.href = list[currentIndex];
                            anchor.click();
                        }}>
                            <DownloadSimple size={26} />
                        </div>
                        <div className="icon-btn" onClick={onClose}>
                            <X size={26} />
                        </div>
                    </div>
                </div>
                <Slider {...settings} className={`[width:80%] [height:80%] slider-custom ${list.length <=1 ? 'overflow-hidden':''}`}>
                    {
                        list.map((imgUrl) => (
                            <div className=" w-full [height:80vh] ">
                                <img src={imgUrl} alt="pics" className="w-full h-full object-contain" />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}

export default ImageViewer;