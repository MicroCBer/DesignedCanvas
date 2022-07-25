import { Canvas, Path2D, CanvasRenderingContext2D, loadImage, Image } from "skia-canvas/lib";
import { DesignedCanvas, DesignedCtx } from "../canvas/canvas";
import { Utils } from "../utils";
class Base {
    private _height = 50;
    public get height() {
        return this._height;
    }
    public set height(value) {
        this._height = value;
    }
    
    private _width = 50;
    public get width() {
        return this._width;
    }
    public set width(value) {
        this._width = value;
    }

    borderRadius = 5;
    blur = 0;
    backgroundColor: string | undefined;
    backgroundImage: Image | undefined;
    backgroundImageMode: "clip" | "resize" | undefined;
    shadow: [string, number, number, number] | undefined;

    // Generated by Utils.ts
    withHeight(height: number) { this.height = height; return this }
    withWidth(width: number) { this.width = width; return this }
    withBorderRadius(borderRadius: number) { this.borderRadius = borderRadius; return this }
    withBlur(blur: number) { this.blur = blur; return this }
    withBackgroundColor(backgroundColor: string) { this.backgroundColor = backgroundColor; return this }
    withBackgroundImage(backgroundImage: Image) { this.backgroundImage = backgroundImage; return this }
    withBackgroundImageMode(backgroundImageMode: "clip" | "resize") { this.backgroundImageMode = backgroundImageMode; return this }
    withShadow(shadow: [string, number, number, number]) { this.shadow = shadow; return this }

    private renderBlur(sourceCanvas: DesignedCanvas, distCanvas: DesignedCanvas, renderShape: Path2D): void {
        let ctx = distCanvas.getContext("2d");

        ctx.filter = 'blur(' + this.blur + 'px)';
        sourceCanvas.getContext("2d")
        ctx.drawCanvas3(sourceCanvas, 0, 0);

        ctx.filter = 'none';
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = '#000';
        ctx.fillPath(renderShape);
        ctx.globalCompositeOperation = 'source-over'
    }

    render(canvas: DesignedCanvas, renderInner: ((canvas: DesignedCanvas) => void) | undefined = undefined) {
        let nCanvas = canvas.cloneNew()

        let path = new Path2D();

        path.rect(0, 0, this.width, this.height);
        path = path.round(this.borderRadius)

        if (this.shadow) {
            let ctx = nCanvas.getContext("2d");
            ctx.addShadow(this.shadow);
            ctx.fillPath(path);
        }

        if (this.blur > 0)
            this.renderBlur(canvas, nCanvas, path)

        if (this.backgroundImage) {
            this.backgroundImageMode ??= "clip";
            let ctx = nCanvas.getContext("2d");

            let radio = Math.max(
                this.width / this.backgroundImage.width
                , this.height / this.backgroundImage.height)

            if (this.backgroundImageMode == "clip")
                ctx.drawImage5(this.backgroundImage, 0, 0, this.backgroundImage.width * radio, this.backgroundImage.height * radio);
            else
                ctx.drawImage5(this.backgroundImage, 0, 0, this.width, this.height);
            ctx.globalCompositeOperation = 'destination-in';
            ctx.fillStyle = '#000';
            ctx.fillPath(path);
            ctx.globalCompositeOperation = 'source-over'
        }

        if (this.backgroundColor) {
            let ctx = nCanvas.getContext("2d");
            ctx.fillStyle = this.backgroundColor;
            ctx.fillPath(path);
        }

        if (renderInner) {
            let ctx = nCanvas.getContext("2d");
            renderInner(nCanvas);
            ctx.globalCompositeOperation = 'destination-in';
            ctx.fillStyle = '#000';
            ctx.fillPath(path);

            ctx.globalCompositeOperation = 'source-over'
        }

        canvas.getContext("2d")
            .drawCanvas3(nCanvas, 0, 0);
    }
}

// console.log(Utils.makeFunctional(`
// gen_functional(
//     height:number
//     width:number
//     borderRadius:number
//     blur:number
//     backgroundColor:string
//     backgroundImage:Image
//     backgroundImageMode:"clip" | "resize"
//     shadow:[string, number, number, number])`))

export { Base };