import React from 'react'
import ImageGallery from 'react-image-gallery';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md'

const Galeria = (a) => {
    const [images2, setImages2] = React.useState([])
    React.useEffect(() => {
         if (a.images && a.filtrocolor) {
            const colorgaleria = a.images.filter(d => d.name === a.filtrocolor)
            if (colorgaleria[0].images) {
                setImages2("")
                colorgaleria[0].images.forEach((el, index) => {
                    el != null ? setImages2(prevState => [...prevState, { original: el, thumbnail: el }]) : console.log('no hago nada')

                })
            }  if (colorgaleria[0].video != ""){
                colorgaleria[0].video.forEach((la, index) => {
                    setImages2(prevState => [...prevState, { thumbnail: colorgaleria[0].miniaturavideo, renderItem: () => renderVideo(colorgaleria[0].video)}])
                })
            } 
        
        } 
       

    }, [a])
    const src =
        "https://i.imgur.com/AUhyLbb.mp4";
    const rellenar = (colorgaleria) => {

    }
    /*     console.log(images2)
     */
    /*     { original: element, thumbnail: element }
     */

    const LeftNav = React.memo(({
        disabled,
        onClick,
    }) => {
        return (
            <button
                type="button"
                className="image-gallery-icon image-gallery-left-nav   hover:text-booty  text-white drop-shadow-2lg "
                disabled={disabled}
                onClick={onClick}
                aria-label="Previous Slide"
            >
                <MdOutlineArrowLeft className='text-[3rem]    ' />
            </button>
        );
    });
    const RightNav = React.memo(({
        disabled,
        onClick,
    }) => {
        return (
            <button
                type="button"
                className="image-gallery-icon image-gallery-right-nav hover:text-booty  text-white drop-shadow-2lg "
                disabled={disabled}
                onClick={onClick}
                aria-label="Next Slide"
            >
                <MdOutlineArrowRight className='text-[3rem]    ' />
            </button>
        );
    });


    const renderVideo = (item) => {
        const opts = {
            height: '100%',
            width: '100%'
        };
        return (
            <div className='image-gallery-image video'>
                <video controls width="100%" height='100%'>
                    <source  className=' video' src={src} type="video/mp4" />
                </video>
            </div>
        );
    }

    const images = [
        
          {
              original: 'https://img.ltwebstatic.com/images3_pi/2022/03/09/164682884147302453623aedc2a6c15657212f777b_thumbnail_900x.webp',
              thumbnail: 'https://img.ltwebstatic.com/images3_pi/2022/03/09/164682884147302453623aedc2a6c15657212f777b_thumbnail_900x.webp',
  
          },
         {
             original: 'https://img.ltwebstatic.com/images3_pi/2022/03/09/164682884147302453623aedc2a6c15657212f777b_thumbnail_900x.webp',
             thumbnail: 'https://img.ltwebstatic.com/images3_pi/2022/03/09/164682884147302453623aedc2a6c15657212f777b_thumbnail_900x.webp',
 
         }, 
        {
            /*             original: 'https://img.ltwebstatic.com/images3_pi/2022/03/09/164682884147302453623aedc2a6c15657212f777b_thumbnail_900x.webp',
             */
            thumbnail: 'https://i.imgur.com/7OfaNkD.jpeg',
            renderItem: () => renderVideo(),
        },
        /*   {
              original: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
              thumbnail: 'https://img.ltwebstatic.com/images3_pi/2022/03/09/164682884147302453623aedc2a6c15657212f777b_thumbnail_900x.webp',
  
          }, */

    ];


    return (
        <div className='w-[40vw]  items-center flex justify-center'>
            <ImageGallery
                showPlayButton={false}
                showFullscreenButton={false}
                showIndex={false}
                thumbnailPosition='right'
                stopPropagation={true}
                lazyLoad={true}
                disableThumbnailScroll={true}
                renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                items={images2}

/*                 renderItem={renderVideo} 
 */            />

            {/*  <video controls width="100%">
                <source src={src} type="video/mp4" />
            </video>  */}
        </div>
    )
}

export default Galeria