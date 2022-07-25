import { DesignedCanvas, DesignedCtx } from "../canvas/canvas";
import { Base } from "./base";

class List<T> extends Base {
    position: "vertical" | "horizontal" = "vertical";
    itemMargin: [number, number] = [10, 10];
    constructor(
        public items: T[],
        public painter: ((item: T) => Base) | ((item: T, index: number) => Base)) {
        super()
    }

    withPosition(position: "vertical" | "horizontal") { this.position = position; return this; }
    withMargin(x: number, y: number = x) { this.itemMargin = [x, y]; return this; }

    render(canvas: DesignedCanvas): void {
        super.render(canvas, (canvas) => {
            let dx = 0, dy = 0;
            let maxWidth = -1, maxHeight = -1
            for (let index = 0; index < this.items.length; index++) {
                let item = this.items[index];

                let dom = this.painter(item, index);
                
                maxWidth = Math.max(maxWidth, dom.width);
                maxHeight = Math.max(maxHeight, dom.height);

                if (this.position == "vertical") {
                    if (dy + dom.height > this.height) {
                        dy = 0;
                        dx += this.itemMargin[0] + maxWidth;
                        maxWidth = -1
                    }
                    dom.render(canvas.withOffset(dx, dy));
                    dy += dom.height;
                    dy += this.itemMargin[1];
                }

                if (this.position == "horizontal") {
                    if (dx + dom.width > this.height) {
                        dx = 0;
                        dy += this.itemMargin[1] + maxHeight;
                        maxHeight = -1
                    } else {
                        dx += this.itemMargin[0];
                    }
                    dom.render(canvas.withOffset(dx, dy));
                    dx += dom.width;
                }
            }
        })
    }
}

export { List }