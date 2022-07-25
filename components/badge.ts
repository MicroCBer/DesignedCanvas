import { DesignedCanvas, DesignedCtx } from "../canvas/canvas";
import { Base } from "./base";
import { Text } from "./text"

class Badge extends Base {
    contentWidth = false
    withWidth(width: number | "content") {
        if (width === "content") this.contentWidth = true
        else {
            this.contentWidth = true
            this.width = width;
        }

        return this
    }

    get width(): number {
        if (this.contentWidth) {
            let text = new Text()
                .withText(this.text)
                .withFillStyle("white")
                .withFontWeight(600)
                .withFontSize(12)
                .withAlign("center");
            return text.measure().width + 20
        }
        return super.width
    }
    set width(v) {
        super.width = v
    }

    constructor(public text: string) {
        super();
        this.height = 17;
        this.backgroundColor = "#c689c6"
        this.borderRadius = 3
    }
    render(canvas: DesignedCanvas, renderInner?: ((canvas: DesignedCanvas) => void) | undefined): void {
        this.width = this.width;

        super.render(canvas, (canvas) => {
            new Text()
                .withText(this.text)
                .withFillStyle("white")
                .withFontWeight(600)
                .withFontSize(12)
                .withAlign("center")
                .withWidth(this.width - 10)
                .render(canvas.withOffset(5, 2))

            if (renderInner) renderInner(canvas);
        })
    }
}

export { Badge }