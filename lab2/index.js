class Drawer {
    constructor(canvas, inputsContainer) {
        this.inputsContainer = inputsContainer;
        this.inputValues = {};
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.initCanvas();
    }

    initCanvas() {
        this.ctx.fillStyle = "black";
        this.ctx.setTransform(1,0,0,-1,0,canvas.height);
    }

    readInputs() {
        const inputs = this.inputsContainer.querySelectorAll('input');

        for (const input of inputs) {
            this.inputValues[input.id] = input.type === 'number' ? Number(input.value) : input.value;
        }
    }

    start() {
        this.clear();
        this.readInputs();

        const { pixelScale = 1 } = this.inputValues;
        this.setScale(pixelScale, pixelScale);

        this.draw(...arguments);
        this.inputValues = {};
    }

    draw() {}

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setScale(scale) {
        this.ctx.setTransform(1,0,0,-1,0,canvas.height);
        this.ctx.scale(scale, scale);
    }

    line(x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    putPixel(x, y, c) {
        const defaultColor = this.ctx.fillStyle;
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x, y, 1, 1);

        this.ctx.fillStyle = defaultColor;
    }

    rotateX({ radians, pivot, point }) {
        const [ x0, y0 ] = pivot;
        const [ x, y ] = point;

        return (x - x0) * Math.cos(radians) - (y - y0) * Math.sin(radians) + x0;
    }

    rotateY({ radians, pivot, point }) {
        const [ x0, y0 ] = pivot;
        const [ x, y ] = point;

        return (x - x0) * Math.sin(radians) + (y - y0) * Math.cos(radians) + y0;
    }

    rotatePoint({ radians, pivot, point }) {
        return [
            this.rotateX({ radians, pivot, point }),
            this.rotateY({ radians, pivot, point }),
        ];
    }
}

class Lab1 extends Drawer {
    draw() {
        const {
            n,
            x0,
            y0,
            a,
            fi,
            alpha,
        } = this.inputValues;

        this.pifagor(n, x0, y0, a, fi, alpha);
    }

    pifagor(n, x0, y0, a, fi, alpha) {
        if (n <= 0) {
            return;
        }

        const antiAlpha = 90 - alpha;

        const fiRadians = fi * Math.PI / 180;
        const alphaRadians = alpha * Math.PI / 180;

        const pivot = [ x0, y0 ];

        const points = {
            A: [ x0, y0 ],
            B: [ x0, y0 + a ],
            C: [ x0 + a, y0 + a ],
            D: [ x0 + a, y0 ],
        };

        const leftLeg = Math.cos(alphaRadians) * a;
        const rightLeg = Math.sin(alphaRadians) * a;

        points.E = this.rotatePoint({ 
                radians: alphaRadians,
                pivot: points.B,
                point: [ points.B[0] + leftLeg, points.B[1] ]
        });

        for (const pointName of Object.keys(points)) {
            const point = points[pointName];
            points[pointName] = this.rotatePoint({
                radians: fiRadians,
                pivot,
                point,
            });
        }

        this.line(...points.A, ...points.B);
        this.line(...points.B, ...points.C);
        this.line(...points.C, ...points.D);
        this.line(...points.D, ...points.A);
        this.line(...points.B, ...points.E);
        this.line(...points.E, ...points.C);

        const bigHouseArgs = [
            n - 1,              // n
            points.B[0],        // x0
            points.B[1],        // y0
            leftLeg,            // a
            fi + alpha,         // fi
            alpha,              // alpha
        ];

        const littleHouseArgs = [
            n - 1,              // n
            points.E[0],        // x0
            points.E[1],        // y0
            rightLeg,           // a
            fi - antiAlpha,     // fi
            alpha,              // alpha
        ];

        this.pifagor(...bigHouseArgs);
        this.pifagor(...littleHouseArgs);
    }
}

class Lab2 extends Lab1 {
    draw(figureName) {
        switch (figureName) {
            case 'line': {
                const { x1, y1, x2, y2, c } = this.inputValues;
                this.myline(x1, y1, x2, y2, c);
                break;
            }
            case 'circle': {
                const { x0, y0, r, c } = this.inputValues;
                this.mycirc(x0, y0, r, c);
                break
            }
            case 'pifagor': {
                const { n, x0, y0, a, fi, alpha } = this.inputValues;
                this.pifagor(n, x0, y0, a, fi, alpha);
                break;
            }
            case 'newPifagor': {
                const { n, x0, y0, a, fi, alpha } = this.inputValues;
                const line = this.line;
                this.line = this.myline;
                this.pifagor(n, x0, y0, a, fi, alpha);
                this.line = line;
                break;
            }
        }
    }

    myline(x0, y0, x1, y1, c = 'black') {
        let dx = x1 - x0;
        let dy = y1 - y0;
        let deltaX = Math.abs(dx);
        let deltaY = Math.abs(dy);
        let stepX = 1;
        let stepY = 1;
        let delta = deltaX;
        let x = x0;
        let y = y0;

        if (deltaY >= deltaX) {
            delta = deltaY;
        }
        if (dx < 0) {
            stepX = -1;
        }
        if (dy < 0) {
            stepY = -1;
        }

        let errorX = 0;
        let errorY = 0;
        let totalSteps = delta + 1;

        while(totalSteps-- > 0) {
            this.putPixel(x - 1, y - 1, c);
            errorX += deltaX;
            errorY += deltaY;
            if (errorX >= delta) {
                errorX -= delta;
                x += stepX;
            }
            if (errorY >= delta) {
                errorY -= delta;
                y += stepY;
            }
        }
    }

    mycirc(x0, y0, r, c) {
        let x = 0;
        let y = r;
        let delta = 1 - 2 * r;
        let error = 0;

        while (y >= x) {
            this.putPixel(x0 + x, y0 + y, c);
            this.putPixel(x0 + x, y0 - y, c);
            this.putPixel(x0 - x, y0 + y, c);
            this.putPixel(x0 - x, y0 - y, c);
            this.putPixel(x0 + y, y0 + x, c);
            this.putPixel(x0 + y, y0 - x, c);
            this.putPixel(x0 - y, y0 + x, c);
            this.putPixel(x0 - y, y0 - x, c);

            error = 2 * (delta + y) - 1;

            if (delta < 0 && error <= 0) {
                delta += 2 * ++x + 1;
                continue;
            }

            if (delta > 0 && error > 0) {
                delta -= 2 * --y + 1;
                continue;
            }

            delta += 2 * (++x - --y);
        }
    }
}

function init() {
    const canvas = document.getElementById('canvas');
    const inputsContainer = document.getElementById('section');

    const drawer = new Lab2(canvas, inputsContainer);

    window.draw = (figureName) => drawer.start(figureName);
}
