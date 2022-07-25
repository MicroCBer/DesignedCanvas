import { Canvas, CanvasRenderingContext2D, DOMMatrix, Image, Path2D } from 'skia-canvas/lib';
import { Utils } from '../utils';
const transformPath = (path: Path2D, matrix: DOMMatrix) => {
    const copy = new Path2D();
    copy.addPath(path, matrix);
    return copy;
};



class DesignedCtx {
    constructor(public ctx: CanvasRenderingContext2D, public offsetX: number, public offsetY: number) { }

    // Generated by Utils.ts
    get filter() { return this.ctx.filter }
    set filter(v) { this.ctx.filter = v }
    get fillStyle() { return this.ctx.fillStyle }
    set fillStyle(v) { this.ctx.fillStyle = v }
    get font() { return this.ctx.font }
    set font(v) { this.ctx.font = v }
    get globalCompositeOperation() { return this.ctx.globalCompositeOperation }
    set globalCompositeOperation(v) { this.ctx.globalCompositeOperation = v }
    get textBaseline() { return this.ctx.textBaseline }
    set textBaseline(v) { this.ctx.textBaseline = v }
    get textAlign() { return this.ctx.textAlign }
    set textAlign(v) { this.ctx.textAlign = v }


    private calcOffset(x: number, y: number): [number, number] {
        return [x + this.offsetX, y + this.offsetY]
    }
    drawRawCanvas9(image: Canvas, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void {
        this.ctx.drawCanvas(image, ...this.calcOffset(sx, sy), sw, sh, ...this.calcOffset(dx, dy), dw, dh)
    }
    drawRawCanvas5(image: Canvas, dx: number, dy: number, dw: number, dh: number): void {
        this.ctx.drawCanvas(image, ...this.calcOffset(dx, dy), dw, dh)
    }
    drawRawCanvas3(image: Canvas, dx: number, dy: number): void {
        this.ctx.drawCanvas(image, ...this.calcOffset(dx, dy))
    }
    drawCanvas3(image: DesignedCanvas, dx: number, dy: number) {
        this.ctx.drawCanvas(image.canvas,
            ...this.calcOffset(dx - image.offsetX, dy - image.offsetY))
    }
    fill() {
        this.ctx.fill()
    }
    transformPath(path: Path2D) {
        return transformPath(path, new DOMMatrix([1, 0, 0, 1, this.offsetX, this.offsetY]))
    }
    fillPath(path: Path2D) {
        return this.ctx.fill(this.transformPath(path))
    }
    clip(path: Path2D) {
        return this.ctx.clip(this.transformPath(path))
    }
    fillRect(x: number, y: number, w: number, h: number) {
        return this.ctx.fillRect(...this.calcOffset(x, y), w, h);
    }
    drawImage3(image: Image, x: number, y: number) {
        return this.ctx.drawImage(image, ...this.calcOffset(x, y));
    }
    drawImage5(image: Image, x: number, y: number, w: number, h: number) {
        return this.ctx.drawImage(image, ...this.calcOffset(x, y), w, h);
    }
    addShadow(args: [string, number, number, number]) {
        [this.ctx.shadowColor, this.ctx.shadowBlur, this.ctx.shadowOffsetX, this.ctx.shadowOffsetY] = args
    }
    fillText(text: string, x: number, y: number, maxWidth: number) {
        this.ctx.fillText(text, ...this.calcOffset(x, y), maxWidth);
    }
}
// console.log(
//     Utils.makeGetSet("ctx",
//         "filter",
//         "fillStyle",
//         "font",
//         "globalCompositeOperation",
//         "textBaseline",
//         "textAlign"))


class DesignedCanvas {
    constructor(public canvas: Canvas=new Canvas(), public offsetX: number = 0, public offsetY: number = 0) { }
    getContext(type: '2d'): DesignedCtx {
        return new DesignedCtx(this.canvas.getContext(type), this.offsetX, this.offsetY);
    }

    withOffset(x: number, y: number): DesignedCanvas {
        return new DesignedCanvas(this.canvas, this.offsetX + x, this.offsetY + y);
    }
    get width() {
        return this.canvas.width;
    }
    set width(v) {
        this.canvas.width = v
    }
    get height() {
        return this.canvas.height;
    }
    set height(v) {
        this.canvas.height = v
    }
    cloneNew() {
        return new DesignedCanvas(
            new Canvas(
                this.width,
                this.height
            )
            , this.offsetX
            , this.offsetY)
    }
}

export { DesignedCanvas, DesignedCtx }