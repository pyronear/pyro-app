import Canvas, { CanvasRenderingContext2D } from 'react-native-canvas';

type Coord = [number, number, number, number, number];

export function drawRectangles(canvasContext: CanvasRenderingContext2D, localization: string) {
        console.debug("drawRectangles")      
        if (localization === "[]" || !canvasContext)
          return;
        const coords: Coord = JSON.parse(localization)[0];
        const totalW = 300;
        const totalH = 200;
        const [x1, y1, x2, y2, _] = coords;
        console.log(JSON.parse(localization));
        console.log(coords);
        console.log(x1, y1, x2, y2)
        console.log(x1*totalW, y1*totalH, (x2 - x1)*totalW, (y2 - y1)*totalH);

        canvasContext.beginPath();
        canvasContext.rect(x1*totalW, y1*totalH, (x2 - x1)*totalW, (y2 - y1)*totalH);
        canvasContext.strokeStyle = 'green';
        canvasContext.lineWidth = 2;
        canvasContext.stroke();
  }