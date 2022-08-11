import gsap from 'gsap'

function animationEnter (el1, el2) {
  const tl = gsap.timeline()
  tl.from(el1, { duration: 0.5, opacity: 0 }).from(
    el2,
    { duration: 0.5, y: -300, opacity: 0 },
    '-=0.5'
  )
}

function animationLeave (el1, el2) {
  const tl = gsap.timeline()
  tl.to(el1, { duration: 0.5, opacity: 0 }).to(
    el2,
    { duration: 0.5, y: -300, opacity: 0 },
    '-=0.5'
  )
}

export { animationEnter, animationLeave }
