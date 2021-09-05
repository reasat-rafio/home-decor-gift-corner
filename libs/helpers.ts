import { SanityImage } from 'sanity-react-extra'
import { ERROR, SUCCESS } from '../src/store/dom'
import { imageUrlBuilder } from '../utils/sanity'

export const showError = (dispatch: any) => {
    dispatch(ERROR())
    setTimeout(() => {
        dispatch(ERROR())
    }, 2000)
}

export const showSuccess = (dispatch: any) => {
    dispatch(SUCCESS())
    setTimeout(() => {
        dispatch(SUCCESS())
    }, 2700)
}

export const openGraphImages = ({ img }: { img: SanityImage }) => {
    return img
        ? [
              { w: 800, h: 600 },
              { w: 1200, h: 630 },
              { w: 600, h: 600 },
              { w: 256, h: 256 },
          ].map(({ w, h }) => ({
              url: `${imageUrlBuilder.image(img).width(w).height(h).url()}`,
              width: w,
              height: h,
              alt: 'Logo',
              //   alt: `${pageProps.data?.page.seo.title}`,
          }))
        : []
}
