import { Coords2DType } from "../types/CommonTypes";
import PlayerImage from "../../../assets/spaceship.png";

class Player {
  position: Coords2DType;
  velocity: Coords2DType;
  width: number = 100;
  height: number = 100;
  getContext: () => CanvasRenderingContext2D | null;
  image: HTMLImageElement;
  rotation: number = 0;

  constructor(getContext: () => CanvasRenderingContext2D | null) {
    this.getContext = getContext;
    const c = getContext();
    this.position = this.getPosition(c);
    this.velocity = {
      x: 0,
      y: 0,
    };
    const image = new Image();
    image.src = PlayerImage;
    this.image = image;
    image.onload = () => {
      const scale = 0.15;
      this.width = image.width * scale;
      this.height = image.height * scale;
    };
  }

  draw() {
    const c = this.getContext();
    // this.position = this.getPosition(c);
    if (c) {
      c.save();
      // console.log(
      //   this.position.x + this.width / 2,
      //   this.position.y + this.height / 2
      // );
      c.translate(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2
      );
      c.rotate(this.rotation)
      c.translate(
        -this.position.x - this.width / 2,
        -this.position.y - this.height / 2
      );
      c.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height
      );
      c.restore();
    }
  }

  update() {
    if (this.image) {
      this.position.x += this.velocity.x;
      this.draw();
    }
  }

  private getPosition(c: CanvasRenderingContext2D | null) {
    return {
      x: c ? c.canvas.width / 2 - this.width / 2 : 200,
      y: c ? c.canvas.height - 2 * this.height : 200,
    };
  }
}

export default Player;
