const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0xffffff, 1)

const section = document.querySelector("section")
section.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 5000)
camera.position.z = -50
camera.lookAt(scene.position)

// const controls = new THREE.OrbitControls( camera )

// camera.position.set( 0, 20, 100 )
// controls.update()


// const light = new THREE.DirectionalLight(0xffffff, 1)
// light.position.set(0, 0, -1)
// scene.add(light)

const shapes = []

const animate = function () {
  // controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)

  // camera.position.setZ(camera.position.z + 1)

  // shapes.forEach(shape => {
  //   shape.rotateX(0.01)
  //   // console.log(shape.rotateX(0.01))
  //   // shape.position.setZ(shape.position.z - 1)
  // })
}

animate()

let hue = 0

const createShape = function(x, y) {
  const geometries = [
    new THREE.CircleGeometry( 40, 32 )
    // new THREE.ConeGeometry(10, 15, 32),
    // new THREE.BoxGeometry(15, 15, 15),
    // new THREE.TorusGeometry(5, 3, 16, 100)
    // new THREE.SphereGeometry(40, 32, 32)
    ]

    const randNumber = Math.floor(Math.random() * geometries.length)
  // const geometry = new THREE.ConeGeometry(10, 15, 32)
  const geometry = geometries[randNumber]
  const emissiveColor = new THREE.Color("hsl("+ hue +", 100%, 50%)")
  const texture = new THREE.Texture(generateTexture())
  texture.needsUpdate = true

  // const material = new THREE.MeshLambertMaterial({
  //   color: 0xffffff,
  //   emissive: emissiveColor
  // })
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  })

  const shape = new THREE.Mesh(geometry, material)
  shape.position.set(
    (window.innerWidth/2) - x,
    (window.innerHeight/2) - y,
    camera.position.z + 500)

  shape.rotateX(3.1)
  // shape.rotateZ(1)

  shapes.push(shape)
  scene.add(shape)
  hue = hue + 1
}

const generateTexture = function() {

  const size = 512
  canvas = document.createElement( 'canvas' )
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext('2d')

  context.rect( 0, 0, size, size )
  const gradient = context.createLinearGradient( 0, 0, size, size )
  gradient.addColorStop(0, 'red')
  gradient.addColorStop(1, 'yellow')
  context.fillStyle = gradient
  context.fill()

  return canvas
}

let isMouseDown = false

document.addEventListener("mousemove", function(event) {
  if (isMouseDown) {
    createShape(event.pageX, event.pageY)
  }
})

document.addEventListener("mousedown", function() {
  isMouseDown = true
})

document.addEventListener("mouseup", function() {
  isMouseDown = false
})

document.addEventListener("touchmove", function(event) {
  if (isMouseDown) {
    createShape(event.pageX, event.pageY)
  }
})

document.addEventListener("touchstart", function() {
  isMouseDown = true
})

document.addEventListener("touchend", function() {
  isMouseDown = false
})

window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth/ window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

