import { Canvas, Path2D, CanvasRenderingContext2D } from "skia-canvas/lib";
import { DesignedCanvas } from "../canvas/canvas";
import { Utils } from "../utils";

class Text {
    fontSize = 12;
    fontFamily: string = "MiSans"
    fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 = 500;
    fillStyle = "";
    text = "";
    width = 50
    baseline: "bottom" | "middle" | "top" = "top"
    align: "center" | "left" | "right" = "left"

    // Generated by Utils.ts
    withFontSize(fontSize: number) { this.fontSize = fontSize; return this }
    withFontFamily(fontFamily: string) { this.fontFamily = fontFamily; return this }
    withFontWeight(fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900) { this.fontWeight = fontWeight; return this }
    withFillStyle(fillStyle: string) { this.fillStyle = fillStyle; return this }
    withText(text: string) { this.text = text; return this }
    withWidth(width: number) { this.width = width; return this }
    withBaseline(baseline: "bottom" | "middle" | "top",) { this.baseline = baseline; return this }
    withAlign(align: "center" | "left" | "right") { this.align = align; return this }

    private getFontStyle() {
        return `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`
    }

    async render(canvas: DesignedCanvas) {
        let ctx = canvas.getContext("2d")
        ctx.fillStyle = this.fillStyle
        ctx.font = this.getFontStyle()
        ctx.textBaseline = this.baseline
        ctx.textAlign = this.align
        let x = 0;
        if (this.align === "center") x = this.width / 2;
        if (this.align === "right") x = this.width;

        ctx.fillText(this.text, x, 0, this.width)
    }
    measure() {
        let ctx = new Canvas().getContext("2d")
        ctx.font = this.getFontStyle()
        return ctx.measureText(this.text);
    }
}

// console.log(Utils.makeFunctional(`
// gen_functional(
//     fontSize:number
//     fontFamily:string
//     fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
//     fillStyle:string
//     text:string
//     width:number
//     baseline: "bottom" | "middle" | "top",
//     align: "center" | "left" | "right")`))

export { Text }