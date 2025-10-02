'use client';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import Button from '@mui/material/Button/Button';
import Divider from '@mui/material/Divider';
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
        <ChevronRightIcon />
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
        <ChevronLeftIcon />
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
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/${track.imgUrl}`}
            />
            <Link
              href={`/track/${track._id}?audio=${track.trackUrl}&id=${track._id}`}
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
