'use client';
import { convertSlugUrl } from '@/utils/api';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Link from 'next/link';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface IProps {
  data: ITrackTop[];
  title?: string;
}

const MainSlider = (props: IProps) => {
  const { data, title } = props;

  const NextArrow = (props: any) => {
    return (
      <Button
        variant="contained"
        color="inherit"
        onClick={props.onClick}
        sx={{
          position: 'absolute',
          right: 0,
          top: '25%',
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRight />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        variant="contained"
        color="inherit"
        onClick={props.onClick}
        sx={{
          position: 'absolute',
          top: '25%',
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeft />
      </Button>
    );
  };

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  //box === div
  return (
    <Box
      sx={{
        margin: '0 50px',
        '.track': {
          padding: '0 10px',
          img: {
            width: '150px',
            height: '150px',
          },
        },
        h3: {
          border: '1px solid #ccc',
          padding: '20px',
          height: '200px',
        },
      }}
    >
      <h2> {title ?? 'Multiple tracks'} </h2>

      <Slider {...settings}>
        {data?.map((track) => (
          <div className="track" key={track._id}>
            <div
              style={{
                position: 'relative',
                height: '200px',
                width: '100%',
              }}
            >
              <Image
                alt={track.title}
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${track.imgUrl}`}
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            <Link
              href={`/track/${convertSlugUrl(track.title)}-${
                track._id
              }.html?audio=${track.trackUrl}`}
            >
              {track.title}
            </Link>
            <h5>{track.description}</h5>
          </div>
        ))}
      </Slider>
      <Divider />
    </Box>
  );
};

export default MainSlider;
