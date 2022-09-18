import { useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import { CaretLeft, CaretRight } from "phosphor-react";
import { GameBanner } from "./GameBanner"
import "keen-slider/keen-slider.min.css"

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  index: number;
  _count: {
    ads: number;
  }
}

export default function GameSlider(props: any) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 5,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  });
  return (
    <>
      <div className="navigation-wrapper relative">
        <div ref={sliderRef} className="keen-slider">
          {props.gameList.map((game: Game) => {
            return (
              <div key={game.id} className={`keen-slider__slide number-slide${game.index}`}>
                <GameBanner
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCount={game._count.ads}
                />
              </div>
            )
          })}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
              className="-left-[7.5rem]"
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
              className="-right-[7.5rem]"
            />
          </>
        )}
      </div>
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
  className: string
}) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"
        } ${disabled} w-20 h-20 absolute top-[9rem] cursor-pointer text-white ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <CaretLeft />
      )}
      {!props.left && (
        <CaretRight />
      )}
    </svg>
  )
}
