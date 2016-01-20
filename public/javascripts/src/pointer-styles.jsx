const K_WIDTH = 40;
const K_HEIGHT = 40;

const pointerStyle = {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
    cursor: 'pointer',
    border: '5px solid red',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    fontWeight: 'bold',
};

export { pointerStyle };