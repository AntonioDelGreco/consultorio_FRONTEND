const Picture = ({ avif, webp, jpg, clases = '' }) => {
  return (
      <picture>
        <source srcSet={avif} type="image/avif"/>
        <source srcSet={webp} type="image/webp"/>
        <img className={clases} loading='lazy' src={jpg} />
      </picture>
  )
}

export default Picture