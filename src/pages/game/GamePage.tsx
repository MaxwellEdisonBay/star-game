import React, { useEffect, useRef } from "react";
import Player from "./model/Player";
import "./GamePage.css";

interface SingleKeyState {
  pressed: boolean;
}
interface KeysState {
  a: SingleKeyState;
  d: SingleKeyState;
  space: SingleKeyState;
}

function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const getContext = () =>
        canvasRef.current ? canvasRef.current.getContext("2d") : null;
      const c = getContext();
      const player = new Player(getContext);
      const keys: KeysState = {
        a: {
          pressed: false,
        },
        d: {
          pressed: false,
        },
        space: {
          pressed: false,
        },
      };
      const animate = () => {
        requestAnimationFrame(animate);
        if (c) {
          c.fillStyle = "black";
          c.fillRect(0, 0, c.canvas.width, c.canvas.height);
        }
        player.update();
        if (keys.a.pressed && player.position.x >= 0) {
          player.rotation = -0.15
          player.velocity.x = -5;
        } else if (keys.d.pressed && player.position.x + player.width <= (canvasRef.current ? canvasRef.current.width : 200)) {
          player.velocity.x = 5;
        } else {
          player.velocity.x = 0;
        }
      };
      animate();
      const handleResize = () => {
        if (c) {
          c.canvas.height = window.innerHeight;
          c.canvas.width = window.innerWidth;
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      window.addEventListener("keydown", ({ key }) => {
        switch (key) {
          case "a": {
            console.log("left");
            keys.a.pressed = true;
            console.log(player.velocity);
            break;
          }

          case "d": {
            console.log("right");
            keys.d.pressed = true;
            break;
          }

          case " ": {
            console.log("space");
            keys.space.pressed = true;
            break;
          }
        }
      });
      window.addEventListener("keyup", ({ key }) => {
        switch (key) {
          case "a": {
            keys.a.pressed = false;
            break;
          }

          case "d": {
            keys.d.pressed = false;
            break;
          }

          case " ": {
            keys.space.pressed = false;
            break;
          }
        }
      });

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="gamepage">
      <canvas
        style={{ width: "100vw", height: "100vh" }}
        ref={canvasRef}
        // width={window.innerWidth}
        // height={window.innerHeight}
      ></canvas>
    </div>
  );
}

export default GamePage;
