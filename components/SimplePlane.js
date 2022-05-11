import React, { useRef, useState } from "react";
import { Plane, useCurtains } from "react-curtains";
import { Vec2 } from "curtainsjs";
import { vertexShader, fragmentShader } from "../assets/shaders/shaders";

function SimplePlane() {
  const [plane, setPlane] = useState(null);

  const mousePosition = useRef(new Vec2());
  const mouseLastPosition = useRef(new Vec2());

  const deltas = useRef({
    max     : 0,
    applied : 0
  });

  const uniforms = {
    resolution: {
      // resolution of our plane
      name  : "uResolution",
      type  : "2f",            // notice this is an length 2 array of floats
      value : [0, 0]
    },
    time: {
      // time uniform that will be updated at each draw call
      name  : "uTime",
      type  : "1f",
      value : 0
    },
    mousePosition: {
      // our mouse position
      name  : "uMousePosition",
      type  : "2f",                  // again an array of floats
      value : mousePosition.current
    },
    mouseMoveStrength: {
      // the mouse move strength
      name  : "uMouseMoveStrength",
      type  : "1f",
      value : 0
    }
  };

  useCurtains(
    (curtains) => {
      const onMouseMove = (e) => {
        // update mouse last pos
        mouseLastPosition.current.copy(mousePosition.current);

        const mouse = new Vec2();

        // get our mouse/touch position
        if (e.targetTouches) {
          mouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
        } else {
          mouse.set(e.clientX, e.clientY);
        }

        // lerp the mouse position a bit to smoothen the overall effect
        mousePosition.current.set(
          curtains.lerp(mousePosition.current.x, mouse.x, 0.3),
          curtains.lerp(mousePosition.current.y, mouse.y, 0.3)
        );

        // calculate the mouse move strength
        if (mouseLastPosition.current.x && mouseLastPosition.current.y) {
          let delta =
            Math.sqrt(
              Math.pow(
                mousePosition.current.x - mouseLastPosition.current.x,
                2
              ) +
                Math.pow(
                  mousePosition.current.y - mouseLastPosition.current.y,
                  2
                )
            ) / 30;
          delta = Math.min(4, delta);
          // update max delta only if it increased
          if (delta >= deltas.current.max) {
            deltas.current.max = delta;
          }
        }

        if (plane) {
          // update our mouse position uniform
          plane.uniforms.mousePosition.value = plane.mouseToPlaneCoords(
            mousePosition.current
          );
        }
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("touchmove", onMouseMove, { passive: true });
      };
    },
    [plane]
  );

  const setResolution = (plane) => {
    const planeBBox = plane.getBoundingRect();
    plane.uniforms.resolution.value = [planeBBox.width, planeBBox.height];
  };

  const onReady = (plane) => {
    plane.setPerspective(35);

    deltas.current.max = 2;

    setResolution(plane);

    // dont bother with user gesture
    plane.playVideos();

    setPlane(plane);

  };

  const onRender = (plane) => {
    // increment our time uniform

    plane.uniforms.time.value++;

    // decrease both deltas by damping : if the user doesn't move the mouse, effect will fade away
    deltas.current.applied +=
      (deltas.current.max - deltas.current.applied) * 0.02;
    deltas.current.max += (0 - deltas.current.max) * 0.01;

    // send the new mouse move strength value
    plane.uniforms.mouseMoveStrength.value = deltas.current.applied;
  };

  const onAfterResize = (plane) => {
    setResolution(plane);
  };

  return (
    <Plane
      className="SimpleVideoPlane"
      // plane init parameters
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      widthSegments={20}
      heightSegments={20}
      uniforms={uniforms}
      // plane events
      onReady={onReady}
      onRender={onRender}
      onAfterResize={onAfterResize}
    >
      <video
      className="planeVideo"
        src="https://storage.coverr.co/videos/SqATu9FFa3sMU8DgnrKVu01TfN8rEZgaE?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjAzODg4MDUyfQ.8tcbQ9WM8G5SSt4iUy0MYhSswnJ-l2M5BKGftJVsN6k"
        data-sampler="simplePlaneTexture"
      />

       
      <style jsx>{`
        .SimpleVideoPlane {
          position : absolute;
          top      : 5%;
          right    : 5%;
          bottom   : 5%;
          left     : 5%;
        }

        .plandeVideo {
          display : none;
        }
      `}</style>

      <style jsx global>{`
  
      `}</style>
    </Plane>
  );
}

export default SimplePlane;
