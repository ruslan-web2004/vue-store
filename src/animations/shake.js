import gsap from 'gsap'
export default function (el) {
  const tl = gsap.timeline()
  tl.to(el, { duration: 0.1, x: 10 })
    .to(el, { duration: 0.1, x: -10 })
    .to(el, { duration: 0.1, x: 10 })
    .to(el, { duration: 0.1, x: -10 })
    .to(el, { duration: 0.1, x: 10 })
    .to(el, { duration: 0.1, x: -10 })
    .to(el, { duration: 0.1, x: 0 })
}
